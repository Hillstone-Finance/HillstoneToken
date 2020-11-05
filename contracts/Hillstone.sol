pragma solidity ^0.6.2;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Hillstone is ERC20("Hillstone", "HTC") {
	/**
     * @notice Construct a new Hillstone token
     */
    constructor() public {
		_mint(msg.sender, 10000000000e18);
        emit Transfer(address(0), msg.sender, 10000000000e18);
    }
}