import { Helmet } from 'react-helmet-async';
import { Customer } from 'src/sections/customer';

// ----------------------------------------------------------------------

export default function CustomersPage() {
  return (
    <>
      <Helmet>
        <title> Customers | EREngineers </title>
      </Helmet>

      <Customer />
    </>
  );
}
