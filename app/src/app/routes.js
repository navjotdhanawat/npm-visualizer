import React from 'react';
import { Route, IndexRoute } from 'react-router';


export default (
    <Route path="/" component={Main}>
        <IndexRoute component={HelloPage} />
        <Route path="emoji" component={EmojiWallPage} />
    </Route>
);