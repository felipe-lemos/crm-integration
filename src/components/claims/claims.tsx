import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';

import useClaims from '../../hooks/useClaims';
import { useEffect, useState } from 'react';
import DataTableManager from '@commercetools-uikit/data-table-manager';
import DataTable from '@commercetools-uikit/data-table';

import { useCustomViewContext } from '@commercetools-frontend/application-shell-connectors';
import SlideStack from './claimDetails';

interface Claim {
  id: string;
  name: string;
  desc: string;
  due: string;
  customFields: any[];
}
const Claims = () => {
  const hostUrl = useCustomViewContext((context) => context.hostUrl);
  const url = new URL(hostUrl);

  const orderId = url.pathname.split('/')[3];
  //const orderId = '1f57703d-27d2-46bf-b7c8-9c8bf4d6d76c';
  const { getClaims } = useClaims();

  const [claims, setClaims] = useState<Claim[]>([]);
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>();
  function onBack() {
    setSelectedClaim(null);
  }

  useEffect(() => {
    const fetchClaims = async () => {
      const response = await getClaims(orderId);

      setClaims(response);
    };
    fetchClaims();
  }, []);

  const columns = [
    { key: 'status', label: 'Status' },
    { key: 'claimNumber', label: 'Claim Number' },
    { key: 'submissionDate', label: 'Submission Date' },
    { key: 'accountId', label: 'Account Id' },
    { key: 'desc', label: 'Description' },
  ];

  return (
    <Spacings.Stack scale="xl">
      {selectedClaim ? (
        <SlideStack selectedClaim={selectedClaim} onBack={onBack} />
      ) : (
        <Spacings.Stack scale="s">
          <Text.Headline as="h2">Claims </Text.Headline>
          <Text.Subheadline as="h4">
            This page displays all the claims associated with the order.
          </Text.Subheadline>
          <hr />
          {claims.length > 0 ? (
            <DataTableManager columns={columns}>
              <DataTable
                rows={claims}
                onRowClick={(item, index) => setSelectedClaim(item)}
              />
            </DataTableManager>
          ) : (
            <div>
              <Text.Body as="p">No claims available for this order.</Text.Body>
            </div>
          )}
        </Spacings.Stack>
      )}
    </Spacings.Stack>
  );
};
Claims.displayName = 'Claims';

export default Claims;
