interface IProps {
  price: number;
  exchangeRate: number;
  amount: number;
}
const CurrencyChange = ({ props }: { props: IProps }) => {
  const { price, exchangeRate, amount } = props;
  const value = amount * price * exchangeRate;
  return value;
};

export default CurrencyChange;
