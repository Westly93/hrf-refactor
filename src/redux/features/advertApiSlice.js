import {api} from '../services/api';
const advertApiSlice= api.injectEndpoints({
    endpoints: builder=>({
        adverts: builder.query({
            query: ()=>({
                url: '/advert',
            })
        }),
        advert: builder.query({
            query: (id)=>({
                url: `/advert/${id}`,
            })
        }),
        advertRequirements: builder.query({
            query: (id)=>({
                url: `/advert/${id}`,
            })
        }),
        appliedAdverts: builder.query({
            query: ()=>({
                url: '/applied',
            })
        }),
        updateAdvert: builder.mutation({
            query: (formData)=>({
                url: `/advert/${formData.id}`
            })
        }),
        deleteAdvert: builder.mutation({
            query: (id)=>({
                url: `/advert/${id}`,
                method: 'DELETE',
            })
        }),
        deleteRequirement: builder.mutation({
            query: (id)=>({
                url: `/advert-requirements/${id}`,
                method: 'DELETE',
            })
        }),
        addRequirement: builder.mutation({
            query: (formData)=>({
                url: '/requirements',
                method: "POST",
                body: {}
            })
        }),
        addAdvert: builder.mutation({
            query: ({title, content, number_of_posts, closing_date, advert_type})=>({
                url: '/advert',
                method: "POST",
                body: {title, content, number_of_posts, closing_date, advert_type}
            })
        })
    })
})

export const {
    useAdvertsQuery, useAddAdvertMutation,useAdvertQuery
} = advertApiSlice;