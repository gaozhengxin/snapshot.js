import { strategy as balancer } from './balancer';
import { strategy as erc20BalanceOf } from './erc20-balance-of';
import { strategy as erc20BalanceOfFixedTotal } from './erc20-balance-of-fixed-total';
import { strategy as erc20BalanceOfCv } from './erc20-balance-of-cv';
import { strategy as makerDsChief } from './maker-ds-chief';
import { strategy as erc20BalanceAndLiqudityOf } from './erc20-balance-and-liqudity-of';


export default {
  erc20BalanceAndLiqudityOf,
  balancer,
  erc20BalanceOf,
  erc20BalanceOfFixedTotal,
  erc20BalanceOfCv,
  makerDsChief
};
