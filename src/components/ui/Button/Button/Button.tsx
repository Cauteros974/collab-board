import React from 'react';
import clsx from 'clsx';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant ? 'primary' | 'secondary' | 'danger';
}

