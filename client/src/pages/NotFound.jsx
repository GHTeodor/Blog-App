import React from 'react';
import { Link } from 'react-router-dom';

export function NotFound() {
    return (
        <Link to="/">
            <div className="not-found" />
        </Link>
    );
}
