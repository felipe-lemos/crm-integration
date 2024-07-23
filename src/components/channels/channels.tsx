import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import messages from './messages';

const Channels = () => {
  return (
    <Spacings.Stack scale="xl">
      <Spacings.Stack scale="s">
        <Text.Headline as="h2" intlMessage={messages.title} />
        <Text.Subheadline as="h4">Test</Text.Subheadline>
      </Spacings.Stack>
    </Spacings.Stack>
  );
};
Channels.displayName = 'Channels';

export default Channels;
