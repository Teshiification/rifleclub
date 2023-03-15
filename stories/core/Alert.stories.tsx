import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Alert } from '../../components/core';

export default {
    title: 'libraries/Core/Alert',
    component: Alert,
    argTypes: {},
} as ComponentMeta<typeof Alert>;

const Template: ComponentStory<typeof Alert> = args => (
    <Alert {...args}>Hello world!</Alert>
);

export const Default = Template.bind({});
Default.args = {};

export const Warning = Template.bind({});
Warning.args = {
    ...Default.args,
    color: 'yellow',
};

export const Error = Template.bind({});
Error.args = {
    ...Default.args,
    color: 'red',
};
