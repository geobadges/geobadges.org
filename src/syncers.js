import syncURLSearchParams from 'actions/sync-url-search-params'

let count = 0;

/*
  This was originally put in to prevent the app from spinning out of control
  and accidentally making hundreds of API calls.
*/
const threshold = 1000;

const syncers = [
  /*
    This syncer updates your url when the user changes pages, searches
    for something, or selects a filter option.

    For example, this is what updates skillLevel='Beginner' to skillLevel='Intermediate'
    when a user changes pages in /badges
  */
 {
    select: state => [
      // state.router.location.pathname,
      state.filters
    ],
    sync: (state, dispatch) => {
      console.log('syncing url search params')
      dispatch(syncURLSearchParams(state))
    }
  },
];

export default syncers;