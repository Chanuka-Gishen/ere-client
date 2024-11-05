import { Helmet } from 'react-helmet-async';

import { Units } from 'src/sections/units';

// ----------------------------------------------------------------------

export default function UnitsPage() {
  return (
    <>
      <Helmet>
        <title> Units | EREngineers </title>
      </Helmet>

      <Units />
    </>
  );
}
