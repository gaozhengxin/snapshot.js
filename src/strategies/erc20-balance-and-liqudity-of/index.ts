import { formatUnits } from '@ethersproject/units';
import { multicall } from '../../utils';
import { abi } from './TestToken.json';

export async function strategy(provider, addresses, options, snapshot) {
  const blockTag = typeof snapshot === 'number' ? snapshot : 'latest';
  const response = await multicall(
    provider,
    abi,
    addresses.map((address: any) => [options.address, 'balanceOf', [address]]),
    { blockTag }
  );
  const response2 = await multicall(
    provider,
    abi,
    addresses.map((address: any) => [options.liquidity_address, 'balanceOf', [address]]),
    { blockTag }
  );
  
  const response3 = await multicall(
    provider,
    abi,
    [[options.liquidity_address, 'totalSupply', []]],
    {blockTag}
  );
  let totalLiq = parseFloat(formatUnits(response3.toString(), options.liquidity_decimals));
  const response4 = await multicall(
    provider,
    abi,
    [[options.address, 'balanceOf', [options.liquidity_address]]],
    {blockTag}
  );
  let exBal = parseFloat(formatUnits(response4[0].toString(), options.decimals));
  return Object.fromEntries(response.map((value, i) => {
    let bal = parseFloat(formatUnits(value.toString(), options.decimals));
    let liq = parseFloat(formatUnits(response2[i].toString(), options.liquidity_decimals));
    let share = liq / totalLiq
    return [addresses[i], bal + exBal * share];
  }));
}

