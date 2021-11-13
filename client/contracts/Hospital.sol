pragma solidity ^0.4.26;

contract Hospital {
    uint256 public time = 0;
    uint256 public tokenStart = 1;
    uint256 public tokenNum = 0;

    mapping(uint256 => Patient) public patients;

    struct Patient {
        uint256 TokenNumber;
        uint256 predictedTime;
        address author;
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
}
