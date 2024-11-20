// __tests__/ConfigActions.test.ts

import { setCategory, setTheme, setType, toggleSound } from '@/store/actions/ConfigActions';
import { userConfigStore } from '@/store';

jest.mock('@/store', () => ({
   userConfigStore: {
      getState: jest.fn(),
      setState: jest.fn(),
   }
}));

describe('ConfigActions', () => {
   afterEach(() => {
      jest.clearAllMocks();
   });

   describe('setTheme', () => {
      it('should set the theme in the store', () => {
         const theme = 'dark';
         setTheme(theme);
         expect(userConfigStore.setState).toHaveBeenCalledWith({ theme });
      });
   });

   describe('setType', () => {
      it('should set the type in the store', () => {
         const type = 'admin';
         setType(type);
         expect(userConfigStore.setState).toHaveBeenCalledWith({ type });
      });
   });

   describe('setCategory', () => {
      it('should set the category in the store', () => {
         const category = 'technology';
         setCategory(category);
         expect(userConfigStore.setState).toHaveBeenCalledWith({ category });
      });
   });

   describe('toggleSound', () => {
      it('should toggle the sound state to false when it is true', () => {
         (userConfigStore.getState as jest.Mock).mockReturnValue({ sound: true });
         toggleSound();
         expect(userConfigStore.setState).toHaveBeenCalledWith({ sound: false });
      });

      it('should toggle the sound state to true when it is false', () => {
         (userConfigStore.getState as jest.Mock).mockReturnValue({ sound: false });
         toggleSound();
         expect(userConfigStore.setState).toHaveBeenCalledWith({ sound: true });
      });
   });
});
