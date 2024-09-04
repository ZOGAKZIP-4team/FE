// recoilAtoms.js
import { atom } from 'recoil';
import { atomFamily } from 'recoil';

// 추억 개수 Atom
export const memoryCountAtom = atom({
  key: 'memoryCountAtom',
  default: 0,  // 추억 개수의 초기값
});

// 게시물별 댓글 수 Atom
export const commentCountAtom = atomFamily({
  key: 'commentCountAtom',
  default: 0,  // 기본 댓글 개수는 0
});
