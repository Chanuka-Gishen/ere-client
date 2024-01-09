import { Helmet } from 'react-helmet-async';
import { OverviewDetails } from 'src/sections/overview-details';

// ----------------------------------------------------------------------

export default function OverviewDetailsPage() {
  return (
    <>
      <Helmet>
        <title> Details | EREngineers </title>
      </Helmet>

      <OverviewDetails />
    </>
  );
}
