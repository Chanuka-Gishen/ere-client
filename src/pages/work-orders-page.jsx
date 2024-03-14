import { Helmet } from 'react-helmet-async';
import { WorkOrders } from 'src/sections/work-orders';

// ----------------------------------------------------------------------

export default function WorkOrdersPage() {
  return (
    <>
      <Helmet>
        <title> WorkOrders | EREngineers </title>
      </Helmet>

      <WorkOrders />
    </>
  );
}
