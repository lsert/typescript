import React, { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
type Merge<A, B> = {
  [key in keyof (A & B)]: key extends keyof B ? B[key] : key extends keyof A ? A[key] : never;
}
interface PropsIF {
  type?: 'textarea' | 'text';
}
type ss<T> = Readonly<Merge<T, PropsIF>>

class Input<T> extends React.Component<Merge<T, PropsIF>, {}>{
  constructor(props: Merge<T, PropsIF>) {
    super(props);
  }
  render() {
    if (this.props.type === 'textarea') {
      return <div>
        <textarea></textarea>
      </div >
    }
    return <input />
  }
}


new Input<{ name: string, age: number }>({ type: 'textarea', name: 'lvs', age: 125 });