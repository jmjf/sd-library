import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ListResources from './ListResources';
import { resources } from '../temp/resources';

describe('ListResources', () => {
	test('when first rendered, it shows a list of resources and no resource detail', () => {
		// Arrange

		// Act
		render(<ListResources resources={resources} />);

		// Assert
		expect(screen.getByText('Resource Title')).toBeInTheDocument();
		expect(screen.queryByText('Resource Id')).toBeNull();
	});

	test('when a resource in the list is clicked, it shows the resource id for that resource', () => {
		// Arrange
		const resourceIdRegEx = new RegExp(resources[0].resourceId);
		const targetResourceTitle = resources[0].resourceTitle;

		// Act
		render(<ListResources resources={resources} />);
		fireEvent.click(screen.getByText(targetResourceTitle));

		// Assert
		expect(screen.getByText('Resource Title')).toBeInTheDocument();
		expect(screen.getByText(/^Resource Id/)).toBeInTheDocument();
		expect(screen.getByText(resourceIdRegEx)).toBeInTheDocument();
	});

	test('when a second resource in the list is clicked, it shows the resource id for that resource', () => {
		// Arrange
		const targetResourceTitle1 = resources[0].resourceTitle;
		const targetResourceTitle2 = resources[3].resourceTitle;
		const resourceIdRegEx = new RegExp(resources[3].resourceId);

		// Act
		render(<ListResources resources={resources} />);
		fireEvent.click(screen.getByText(targetResourceTitle1));
		fireEvent.click(screen.getByText(targetResourceTitle2));

		// Assert
		expect(screen.getByText('Resource Title')).toBeInTheDocument();
		expect(screen.getByText(/^Resource Id/)).toBeInTheDocument();
		expect(screen.getByText(resourceIdRegEx)).toBeInTheDocument();
	});
});
