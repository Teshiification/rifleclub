import { ComponentStory, ComponentMeta } from '@storybook/react';
import Card from '../../components/core/Card';

export default {
    title: 'libraries/Core/Card',
    component: Card,
    argTypes: {},
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = args => (
    <Card {...args}>Example card</Card>
);

export const Default = Template.bind({});
Default.args = { ...Default.args, color: "blue" };