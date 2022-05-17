import React from "react";
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import App from './App'

//This is gonna help us to do different test 
test('renders content', () => { 
    const note ={
        content: 'This is a test',
        important: true
    };
    const component = render(<App note={note} />);
    console.log(component);
 });
