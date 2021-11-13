pragma solidity ^0.4.26;

contract Hospital {
    uint256 public time = 0;
    uint256 public tokenStart = 1;
    uint256 public tokenNum = 0;
    uint256 public userCount = 0;

    mapping(uint256 => Patient) public patients;
    mapping(address => bool) public registered;
    mapping(uint256 => User) public users;

    struct Patient {
        uint256 TokenNumber;
        uint256 predictedTime;
        address author;
    }

    struct User {
        address author;
        string name;
        uint256 age;
        string blood;
    }

    function bookAppointments(uint256 _time) public {
        time += _time;
        tokenNum++;
        patients[tokenNum] = Patient(tokenNum, _time, msg.sender);
    }

    function deleteAppointments(uint256 _token) public {
        time -= patients[_token].predictedTime;
        tokenStart++;
    }

    function register(
        string memory name,
        uint256 age,
        string memory blood
    ) public {
        address account = msg.sender;
        // require(!registered[account]);
        // registered[msg.sender] = true;
        users[userCount] = User(account, name, age, blood);
        userCount++;
    }
}
