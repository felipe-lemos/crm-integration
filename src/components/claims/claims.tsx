import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';

import useClaims from '../../hooks/useClaims';
import { useEffect, useState } from 'react';
import DataTableManager from '@commercetools-uikit/data-table-manager';
import DataTable from '@commercetools-uikit/data-table';

import { useCustomViewContext } from '@commercetools-frontend/application-shell-connectors';

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
  // const orderId = '9a4bfdef-9779-4f18-9a94-bf4eba148f03';
  const { getClaims } = useClaims();

  const [claims, setClaims] = useState<Claim[]>([]);

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
      <Spacings.Stack scale="s">
        <Text.Headline as="h2">Claims </Text.Headline>
        <Text.Subheadline as="h4">Order ID: {orderId}</Text.Subheadline>
        <hr />
        <DataTableManager columns={columns}>
          <DataTable
            rows={claims}
            onRowClick={(item, index) => alert(`Row click: Row number ${item}`)}
          />
        </DataTableManager>
      </Spacings.Stack>
    </Spacings.Stack>
  );
};
Claims.displayName = 'Claims';

export default Claims;
