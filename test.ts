import React from 'react';

interface BoxIF {
  changeCode(): number;
  name: string;
}

interface BoxConstuctor {
  add(): boolean;
}

const Box: BoxConstuctor = class implements BoxIF {
  static add() {
    return true;
  }
  name = '123';
  changeCode() {
    return 12;
  }
}