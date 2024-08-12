import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from '@storybook/test';
import Button from '../../components/core/Button';

const meta: Meta<typeof Button> = {
	component: Button,
	title: 'Button',
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
	args: {
		'data-testid': 'button-default-story',
		children: 'Button',
		onClick: fn(),
	},
	parameters: {
		jest: ['Button.test.tsx'],
	},
	play: async ({ args, canvasElement }) => {
		const canvas = within(canvasElement);
		await userEvent.click(canvas.getByRole('button'));
		await expect(args.onClick).toHaveBeenCalled();
		await expect(canvas.getByTestId('button-default-story')).toBeInTheDocument();
	},
};
