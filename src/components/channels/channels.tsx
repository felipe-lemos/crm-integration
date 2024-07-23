import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import messages from './messages';
import useClaims from '../../hooks/useClaims';
import { useEffect, useState } from 'react';

import { useCustomViewContext } from '@commercetools-frontend/application-shell-connectors';

interface Claim {
  id: string;
  name: string;
  desc: string;
  due: string;
  customFields: any[];
}
const Channels = () => {
  const customViewContext = useCustomViewContext();

  const { getClaims } = useClaims();

  const [claims, setClaims] = useState<Claim[]>([]);

  useEffect(() => {
    const fetchClaims = async () => {
      const response = await getClaims();

      setClaims(response);
    };
    fetchClaims();
  }, []);

  return (
    <Spacings.Stack scale="xl">
      <Spacings.Stack scale="s">
        <Text.Headline as="h2" intlMessage={messages.title} />
        <Text.Subheadline as="h4">Test</Text.Subheadline>
        <pre>{JSON.stringify(claims, null, 4)}</pre>
        <hr />
        <pre>{JSON.stringify(customViewContext, null, 4)}</pre>
      </Spacings.Stack>
    </Spacings.Stack>
  );
};
Channels.displayName = 'Channels';

export default Channels;
