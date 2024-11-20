import { resetStates, setDefaultTime } from '@/store/actions/TimeActions';
import { userConfigStore, wordStore } from '@/store';

jest.mock('@/store', () => ({
   userConfigStore: {
      setState: jest.fn(),
   },
   wordStore: {
      setState: jest.fn(),
   },
}));

describe('TimeActions tests', () => {
   afterEach(() => {
      jest.clearAllMocks();
   });

   describe('resetStates', () => {
      it('should reset wordStore state to initial values', () => {
         resetStates();
         expect(wordStore.setState).toHaveBeenCalledWith({
            disabled: false,
            activeWord: '',
            userInput: '',
            wordList: [],
            typedHistory: [],
            nextIndex: 0,
            typedEntries: 0,
            errorCount: 0,
         });
      });
   });

   describe('setDefaultTime', () => {
      it('should set the time in userConfigStore', () => {
         const time = 60;
         setDefaultTime(time);
         expect(userConfigStore.setState).toHaveBeenCalledWith({
            time,
         });
      });
   });
});
