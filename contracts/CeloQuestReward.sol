// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CeloQuestReward {
    struct User {
        string farcasterUsername;
        uint256 totalPoints;
        uint256 totalEarned;
        uint256 lastCheckIn;
        uint256 checkInStreak;
        address referrer;
        uint256 referralCount;
        bool isRegistered;
    }

    struct Task {
        uint256 id;
        string title;
        string description;
        uint256 rewardPoints;
        uint256 rewardCelo;
        bool isActive;
        uint256 completionCount;
    }

    mapping(address => User) public users;
    mapping(uint256 => Task) public tasks;
    mapping(address => mapping(uint256 => bool)) public completedTasks;
    
    address[] public userAddresses;
    uint256[] public taskIds;
    uint256 public nextTaskId = 1;
    
    address public owner;
    uint256 public constant POINTS_TO_CELO_RATE = 100; // 100 points = 0.01 CELO
    uint256 public constant DAILY_CHECKIN_POINTS = 5; // Reduced from 10 to 5
    uint256 public constant REFERRAL_POINTS = 25; // Reduced from 50 to 25

    event UserRegistered(address indexed user, string farcasterUsername, address referrer);
    event DailyCheckIn(address indexed user, uint256 streak, uint256 pointsEarned);
    event TaskCompleted(address indexed user, uint256 taskId, uint256 pointsEarned);
    event RewardsClaimed(address indexed user, uint256 pointsSpent, uint256 celoReceived);

    constructor() {
        owner = msg.sender;
        _initializeTasks();
    }

    function _initializeTasks() private {
        _createTask("Follow on Farcaster", "Follow @celoquest on Farcaster", 25, 0); // 50 -> 25
        _createTask("Cast about CeloQuest", "Make a cast mentioning @celoquest", 15, 0); // 30 -> 15
        _createTask("Join Telegram", "Join our Telegram community", 10, 0); // 20 -> 10
        _createTask("Share on Twitter", "Tweet about CeloQuest with #CeloQuest", 20, 0); // 40 -> 20
    }

    function _createTask(string memory title, string memory description, uint256 rewardPoints, uint256 rewardCelo) private {
        tasks[nextTaskId] = Task(nextTaskId, title, description, rewardPoints, rewardCelo, true, 0);
        taskIds.push(nextTaskId);
        nextTaskId++;
    }

    // Auto check-in on first transaction of the day
    modifier autoCheckIn() {
        if (users[msg.sender].isRegistered) {
            _tryDailyCheckIn(msg.sender);
        }
        _;
    }

    function _tryDailyCheckIn(address user) private {
        if (block.timestamp >= users[user].lastCheckIn + 1 days) {
            uint256 streak = (block.timestamp < users[user].lastCheckIn + 2 days) 
                ? users[user].checkInStreak + 1 
                : 1;
            
            users[user].lastCheckIn = block.timestamp;
            users[user].checkInStreak = streak;
            users[user].totalPoints += DAILY_CHECKIN_POINTS;
            
            emit DailyCheckIn(user, streak, DAILY_CHECKIN_POINTS);
        }
    }

    function register(string memory _farcasterUsername, address _referrer) external {
        require(!users[msg.sender].isRegistered, "Already registered");
        require(bytes(_farcasterUsername).length > 0, "Username required");

        users[msg.sender] = User({
            farcasterUsername: _farcasterUsername,
            totalPoints: 0,
            totalEarned: 0,
            lastCheckIn: 0,
            checkInStreak: 0,
            referrer: _referrer,
            referralCount: 0,
            isRegistered: true
        });

        userAddresses.push(msg.sender);

        if (_referrer != address(0) && users[_referrer].isRegistered && _referrer != msg.sender) {
            users[_referrer].totalPoints += REFERRAL_POINTS;
            users[_referrer].referralCount++;
        }

        emit UserRegistered(msg.sender, _farcasterUsername, _referrer);
    }

    function completeTask(uint256 _taskId) external autoCheckIn {
        require(users[msg.sender].isRegistered, "Not registered");
        require(tasks[_taskId].isActive, "Task not active");
        require(!completedTasks[msg.sender][_taskId], "Task already completed");

        completedTasks[msg.sender][_taskId] = true;
        tasks[_taskId].completionCount++;
        
        users[msg.sender].totalPoints += tasks[_taskId].rewardPoints;

        emit TaskCompleted(msg.sender, _taskId, tasks[_taskId].rewardPoints);
    }

    function claimRewards() external autoCheckIn {
        require(users[msg.sender].isRegistered, "Not registered");
        require(users[msg.sender].totalPoints >= POINTS_TO_CELO_RATE, "Insufficient points");

        uint256 pointsToSpend = (users[msg.sender].totalPoints / POINTS_TO_CELO_RATE) * POINTS_TO_CELO_RATE;
        uint256 celoAmount = (pointsToSpend * 0.01 ether) / POINTS_TO_CELO_RATE;

        require(address(this).balance >= celoAmount, "Insufficient contract balance");

        users[msg.sender].totalPoints -= pointsToSpend;
        users[msg.sender].totalEarned += celoAmount;

        payable(msg.sender).transfer(celoAmount);

        emit RewardsClaimed(msg.sender, pointsToSpend, celoAmount);
    }

    function getUser(address _wallet) external view returns (
        string memory farcasterUsername,
        uint256 totalPoints,
        uint256 totalEarned,
        uint256 checkInStreak,
        uint256 referralCount,
        bool canCheckIn
    ) {
        User memory user = users[_wallet];
        bool _canCheckIn = user.isRegistered && (block.timestamp >= user.lastCheckIn + 1 days);
        return (
            user.farcasterUsername,
            user.totalPoints,
            user.totalEarned,
            user.checkInStreak,
            user.referralCount,
            _canCheckIn
        );
    }

    function getLeaderboard() external view returns (address[] memory, uint256[] memory) {
        uint256 length = userAddresses.length;
        address[] memory addresses = new address[](length);
        uint256[] memory points = new uint256[](length);

        for (uint256 i = 0; i < length; i++) {
            addresses[i] = userAddresses[i];
            points[i] = users[userAddresses[i]].totalPoints;
        }

        for (uint256 i = 0; i < length; i++) {
            for (uint256 j = i + 1; j < length; j++) {
                if (points[j] > points[i]) {
                    (points[i], points[j]) = (points[j], points[i]);
                    (addresses[i], addresses[j]) = (addresses[j], addresses[i]);
                }
            }
        }

        return (addresses, points);
    }

    function getAllTasks() external view returns (uint256[] memory) {
        return taskIds;
    }

    function hasCompletedTask(address _user, uint256 _taskId) external view returns (bool) {
        return completedTasks[_user][_taskId];
    }

    function getTotalUsers() external view returns (uint256) {
        return userAddresses.length;
    }

    receive() external payable {}
    
    function withdraw() external {
        require(msg.sender == owner, "Only owner");
        payable(owner).transfer(address(this).balance);
    }
}
