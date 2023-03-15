import { ComponentStory, ComponentMeta } from '@storybook/react';
import { BirthdayCard } from '../../components/widgets/BirthdayCard';
import supabase from '../../lib/supabase';

export default {
    title: 'libraries/Core/Card',
    component: BirthdayCard,
    argTypes: {},
} as ComponentMeta<typeof BirthdayCard>;

const Template: ComponentStory<typeof BirthdayCard> = args => (
    <BirthdayCard {...args}>Example card</BirthdayCard>
);

export const Default = Template.bind({});

const users: user[] = [
    {
        id: '00895b31-1bc0-4e85-839a-30f5713f0e4f',
        name: 'Rainer',
        lastname: 'Zufall',
        birthday: new Date('1971-01-18')
    },
    {
        id: 'c47e1694-c861-4dbf-ae32-123d35a08e34',
        name: 'Reinhaut',
        lastname: 'Hautrein',
        birthday: new Date('1990-01-01')
    },
    {
        id: '5ff6e180-304d-45b5-8706-3a0e8125290e',
        name: 'Danny',
        lastname: 'Sinicco',
        birthday: new Date('1998-04-04')
    },
    {
        id: '711f0440-8c08-4170-ba9f-4674d5f056bf',
        name: 'Nathalie',
        lastname: 'Sickinger',
        birthday: new Date('2000-01-27')
    }
]

Default.args = {
    ...Default.args,
    users: users,
};