import React, { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
type Merge<A, B> = {
  [key in keyof (A & B)]: key extends keyof B ? B[key] : key extends keyof A ? A[key] : never;
}
interface PropsIF {
  type?: 'textarea' | 'text';
}

type InputType<T, K = {}> = T extends 'textarea' ? TextareaHTMLAttributes<HTMLTextAreaElement & K> : InputHTMLAttributes<HTMLInputElement & K>

function isTextarea(other: InputType<'textarea' | 'input'>, type?: 'textarea' | 'text'): other is InputType<'textarea'> {
  return type === 'textarea';
}

function isInput(other: InputType<'textarea'> | InputType<'input'>, type?: 'textarea' | 'text'): other is InputType<'input'> {
  return type !== 'textarea';
}

class Input<T, K> extends React.Component<Merge<InputType<T, K>, PropsIF>, {}>{
  constructor(props: Merge<InputType<T, K>, PropsIF>) {
    super(props);
  }
  render() {
    const { type, ...others } = this.props as PropsIF;
    if (isTextarea(others, this.props.type)) {
      return <div>
        <textarea {...others}></textarea>
      </div >
    }
    if (isInput(others, this.props.type)) {
      return <input {...others} />
    }
    return null;
  }
}


new Input<'text', { haha: number }>({
  type: 'textarea',
  name: 'lvs',
  src: "sad",
  onChange: (e) => {
    console.log(e.target.haha);
  }
});

const A = <Input<'text', { haha: number }> src="111" onChange={(e) => { e.target.haha }} />