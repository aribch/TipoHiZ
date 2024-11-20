import {
   setActiveWord,
   setUserInput,
   setWordList,
   setCaretRef,
   setRef,
   setChar,
   setNextChar,
   setPrevChar,
   setDisabled,
   afterPressingSpace,
   IncreaseTypedEntries,
   setErrorCount,
} from '@/store/actions/WordActions';
import { wordStore } from '@/store';

jest.mock('@/store', () => ({
   wordStore: {
      setState: jest.fn(),
   },
}));

const mockSetState = wordStore.setState as jest.Mock;

describe('WordActions', () => {
   let mockState: any;

   beforeEach(() => {
      mockState = {
         activeWord: '',
         wordList: [],
         nextCharIdx: 0,
         nextIndex: 0,
         userInput: '',
         typedEntries: 0,
         caretRef: null,
         activeWordRef: null,
         typedHistory: [],
      };
      mockSetState.mockImplementation((fn) => {
         if (typeof fn === 'function') {
            mockState = { ...mockState, ...fn(mockState) };
         } else {
            mockState = { ...mockState, ...fn };
         }
      });
   });

   afterEach(() => {
      jest.clearAllMocks();
   });

   describe('setActiveWord', () => {
      it('should set the active word', () => {
         setActiveWord('test');
         expect(mockState.activeWord).toBe('test');
      });
   });

   describe('setUserInput', () => {
      it('should set the user input', () => {
         setUserInput('hello');
         expect(mockState.userInput).toBe('hello');
      });
   });

   describe('setWordList', () => {
      it('should set the word list and shuffle it', () => {
         const wordList = ['apple', 'banana', 'cherry'];
         setWordList(wordList);
         expect(mockState.wordList).toEqual(expect.any(Array));
         expect(mockState.activeWord).toEqual(expect.any(String));
         expect(mockState.userInput).toBe('');
         expect(mockState.typedHistory).toEqual([]);
      });
   });

   describe('setCaretRef', () => {
      it('should set the caretRef', () => {
         const caretRef = { current: null };
         setCaretRef(caretRef);
         expect(mockState.caretRef).toBe(caretRef);
      });
   });

   describe('setRef', () => {
      it('should set the activeWordRef', () => {
         const activeWordRef = { current: null };
         setRef(activeWordRef);
         expect(mockState.activeWordRef).toBe(activeWordRef);
      });
   });

   describe('setChar', () => {
      it('should update userInput and nextCharIdx', () => {
         mockState.userInput = 'he';
         mockState.nextCharIdx = 2;
         setChar('a');
         expect(mockState.userInput).toBe('hea');
         expect(mockState.nextCharIdx).toBe(3);
      });
   });

   describe('setNextChar', () => {
      it('should set the next character from activeWord', () => {
         mockState.activeWord = 'test';
         mockState.nextCharIdx = 1;
         setNextChar();
         expect(mockState.nextChar).toBe('e');
      });
   });

   describe('setPrevChar', () => {
      it('should update activeWord and nextIndex to previous word', () => {
         mockState.wordList = ['a', 'b', 'c'];
         mockState.nextIndex = 2;
         setPrevChar();
         expect(mockState.activeWord).toBe('b');
         expect(mockState.nextIndex).toBe(1);
      });

      it('should handle edge case when nextIndex is 0', () => {
         mockState.wordList = ['a', 'b'];
         mockState.nextIndex = 0;
         setPrevChar();
         expect(mockState.activeWord).toBe('a');
         expect(mockState.nextIndex).toBe(0);
      });
   });

   describe('setDisabled', () => {
      it('should set the disabled state', () => {
         setDisabled(true);
         expect(mockState.disabled).toBe(true);
      });
   });

   describe('afterPressingSpace', () => {
      it('should update the state after pressing space', () => {
         mockState.wordList = ['hello', 'world'];
         mockState.nextIndex = 0;
         mockState.userInput = 'hello';
         mockState.typedHistory = [];
         afterPressingSpace();
         expect(mockState.nextIndex).toBe(1);
         expect(mockState.activeWord).toBe('world');
         expect(mockState.userInput).toBe('');
         expect(mockState.typedHistory).toEqual(['hello']);
         expect(mockState.caretPos).toBe(0);
      });
   });

   describe('IncreaseTypedEntries', () => {
      it('should increment typedEntries', () => {
         mockState.typedEntries = 5;
         IncreaseTypedEntries();
         expect(mockState.typedEntries).toBe(6);
      });
   });

   describe('setErrorCount', () => {
      it('should set the error count', () => {
         setErrorCount(3);
         expect(mockState.errorCount).toBe(3);
      });
   });
});