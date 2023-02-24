import 'react-native';
import React from 'react';
import {navigationMock} from '../../utils/testUtils';
import {render} from '@testing-library/react-native';
import NetworkScreen from './NetworkScreen';

describe('NetworkScreen.tsx', () => {
  it('NetworkScreen.tsx renders correctly', () => {
    const {getByTestId} = render(<NetworkScreen navigation={navigationMock} />);
    expect(getByTestId('NetworkScreen-container')).toBeTruthy();
  });
});
