import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import messages from './messages';
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
const Channels = () => {
  const hostUrl = useCustomViewContext((context) => context.hostUrl);
  const url = new URL(hostUrl);

  const orderId = url.pathname.split('/')[3];

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
    { key: 'title', label: 'Title' },
    { key: 'country', label: 'Country' },
  ];
  return (
    <Spacings.Stack scale="xl">
      <Spacings.Stack scale="s">
        <Text.Headline as="h2" intlMessage={messages.title} />
        <Text.Subheadline as="h4">Order ID: {orderId}</Text.Subheadline>
        <hr />
        <DataTableManager columns={columns}>
          <DataTable rows={claims} />
        </DataTableManager>
        <pre>{JSON.stringify(claims, null, 4)}</pre>
      </Spacings.Stack>
    </Spacings.Stack>
  );
};
Channels.displayName = 'Channels';

export default Channels;
