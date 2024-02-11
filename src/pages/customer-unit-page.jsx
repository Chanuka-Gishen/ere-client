import { Helmet } from 'react-helmet-async';
import { CustomerUnit } from 'src/sections/customer-unit';

// ----------------------------------------------------------------------

export default function CustomerUnitPage() {
  return (
    <>
      <Helmet>
        <title> Unit | EREngineers </title>
      </Helmet>

      <CustomerUnit />
    </>
  );
}
