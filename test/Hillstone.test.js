const { expectRevert } = require('@openzeppelin/test-helpers');
const Hillstone = artifacts.require('Hillstone');

contract('Hillstone', ([alice, bob]) => {
    beforeEach(async () => {
        this.hillstone = await Hillstone.new({ from: alice });
    });

    it('should have correct name and symbol and decimal', async () => {
        const name = await this.hillstone.name();
        const symbol = await this.hillstone.symbol();
        const decimals = await this.hillstone.decimals();
        assert.equal(name.valueOf(), 'Hillstone');
        assert.equal(symbol.valueOf(), 'HTC');
        assert.equal(decimals.valueOf(), '18');
    });

    it('should supply token transfers properly', async () => {
        await this.hillstone.transfer(bob, '1000', { from: alice });
        const aliceBal = await this.hillstone.balanceOf(alice);
        const bobBal = await this.hillstone.balanceOf(bob);
        console.log(aliceBal)
        assert.equal(aliceBal.valueOf(), '9999999999999999999999999000');
        assert.equal(bobBal.valueOf(), '1000');
    });

    it('should fail if you try to do bad transfers', async () => {
        await expectRevert(
            this.hillstone.transfer(bob, '10000000000000000000000000001', { from: alice }),
            'ERC20: transfer amount exceeds balance',
        );
        await expectRevert(
            this.hillstone.transfer(alice, '1', { from: bob }),
            'ERC20: transfer amount exceeds balance',
        );
    });
  });
