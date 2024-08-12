import {api} from '../services/api';
const token = localStorage.getItem("token");
const headers= {
    Authorization: `Bearer ${token}`,
}
const applicationApiSlice= api.injectEndpoints({
    endpoints: builder=>({
        documents: builder.query({
            query: (applicationId)=>({
                url: `/application/${applicationId}/document`,
                headers: headers
            })
        }),
        references: builder.query({
            query: (applicationId)=>({
                url: `/application/reference/${applicationId}`,
                headers: headers
            })
        }),
        scores: builder.query({
            query: ()=>({
                url: '/preshortlists',
                headers: headers
            })
        }),
        advertScores: builder.query({
            query: (advertId)=>({
                url: `/preshortlists/${advertId}`,
                headers: headers
            })
        }),
        requirementScores: builder.query({
            query: ()=>({
                url: '/application-scores',
                headers: headers
            })
        }),
        preshortListScores: builder.query({
            query: (advertId)=>({
                url: `/application-scores/${advertId}`,
                headers: headers
            })
        }),
        profiles: builder.query({
            query: (advertId)=>({
                url: `/profiles/${advertId}`,
                headers: headers
            })
        }),
        createApplication: builder.mutation({
            query: (formData)=>({
                url: '/manage-application',
                method: "POST",
                body: {}
            })
        }),
        addRequirement: builder.mutation({
            query: (formData)=>({
                url: '/application-requirement',
                method: "POST",
                body: {}
            })
        }),
        addDocuments: builder.mutation({
            query: (formData)=>({
                url: '/application-documents',
                method: "POST",
                body: {}
            })
        }),
        addReferences: builder.mutation({
            query: (formData)=>({
                url: '/application-reference',
                method: "POST",
                body: {}
            })
        }),
        addScores: builder.mutation({
            query: (formData)=>({
                url: '/application-scores',
                method: "POST",
                body: {}
            })
        }),
        updateScores: builder.mutation({
            query: (formData)=>({
                url: '/application-scores',
                method: "POST",
                body: {}
            })
        }),
        updateHumanScore: builder.mutation({
            query: (formData)=>({
                url: `/application-scores/${formData.id}`,
                method: "POST",
                body: {}
            })
        }),
    })
})
export const { 
    useDocumentsQuery,
}= applicationApiSlice;