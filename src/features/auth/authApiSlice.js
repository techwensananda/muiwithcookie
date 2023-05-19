import { apiSlice } from "../../app/api/apiSlice";
import { setCredentials } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/auth',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        refresh: builder.query({
            query: () => ({
                url: '/refresh',
                method: 'GET',
            }),



            async onQueryStarted(undefined, { dispatch, queryFulfilled, getState }) {
                // `onStart` side-effect
                try {
                  const { data } = await queryFulfilled

                  // `onSuccess` side-effect
                  dispatch(setCredentials({ ...data,user:'test' }))
                  console.log('getState().auth',getState().auth)

                //   dispatch(messageCreated('Post received!'))
                } catch (err) {
                  // `onError` side-effect
                //   dispatch(messageCreated('Error fetching post!'))
                }
              },
        }),
    })
})

export const {
    useLoginMutation,
    useRefreshQuery
} = authApiSlice