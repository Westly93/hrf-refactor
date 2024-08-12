import {api} from '../services/api';
const token = localStorage.getItem("token");
const headers= {
    Authorization: `Bearer ${token}`,
}
const authApiSlice= api.injectEndpoints({
    endpoints: builder=>({
        experience: builder.query({
            query: ()=>({
                url:'/applicant-experience',
                method: "POST",
                headers: headers,
            })
        }),
        contacts: builder.query({
            query: (id)=>({
                url: `applicants/${id}`,
                headers: headers
            })
        }),
        qualifications: builder.query({
            query: ()=>({
                url: '/applicant-qualifications',
                headers: headers
            })
        }),
        applications: builder.query({
            query: ()=>({
                url: '/application',
                headers: headers
            })
        }),
        nationalities: builder.query({
            query: ()=>({
                url: '/nationality',
                headers: headers
            })
        }),
        contactTypes: builder.query({
            query: ()=>({
                url: '/contact-types',
                headers: headers
            })
        }),
        maritalStatus: builder.query({
            query: ()=>({
                url: '/marital-status',
                headers: headers
            })
        }),
        documentTypes: builder.query({
            query: ()=>({
                url: '/document-types',
                headers: headers
            })
        }),
        documents: builder.query({
            query: ()=>({
                url: '/applicant-documents',
                headers: headers
            })
        }),
        updateExperience: builder.mutation({
            query: (formData)=>({
                url: `/applicant-experience/${formData.id}`,
                method: "POST",
                headers: headers,
                body: {}
            })
        }),
        updateQualifications: builder.mutation({
            query: (formData)=>({
                url: `/applicant-qualifications/${formData.id}`,
                method: "POST",
                headers: headers,
                body: {}
            })
        }),
        login: builder.mutation({
            query: ({email, password})=>({
                url: '/login',
                method: 'POST',
                body: {email, password}
            })
        }),
        activation: builder.mutation({
            query: ({uid, token})=>({
                url: '/activation',
                method: 'POST',
                body: {uid, token}
            })
        }),
        register: builder.mutation({
            query: ({name, email, password, password_confirmation})=>({
                url: '/register',
                method: 'POST',
                body: {name, email, password, password_confirmation}
            })
        }), 
        resetPassword: builder.mutation({
            query: (email)=>({
                url: '/forgot-password',
                method: 'POST',
                body: {email }
            })
        }),
        resetPasswordConfirm: builder.mutation({
            query: ({uid, token, password, password_confirmation})=>({
                url: '/reset-password',
                method: 'POST',
                body: {uid, token, password, password_confirmation }
            })
        }),
        verify: builder.query({
            query: (token)=>({
                url: '/verify',
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
        }),
        logout: builder.mutation({
            query: ()=>({
                url: '/logout',
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
        }),
        addApplicant: builder.mutation({
            query: (formData)=>({
                url: '/applicant',
                method: "POST",
                body: {}
            })
        }),
        addContact: builder.mutation({
            query: (formData)=>({
                url: '/applicant-contacts',
                method: "POST",
                body: {}
            })
        }),
        addNationalId: builder.mutation({
            query: (formData)=>({
                url: '/applicant-national-id',
                method: "POST",
                body: {}
            })
        }),
        addDocuments: builder.mutation({
            query: (formData)=>({
                url: '/applicant-documents',
                method: "POST",
                body: {}
            })
        }),
        addExperience: builder.mutation({
            query: (formData)=>({
                url: '/applicant-experience',
                method: "POST",
                headers: headers,
                body: {}
            })
        }),
    })
})

export const { 
    useLoginMutation, useRegisterMutation, useResetPasswordMutation, 
    useResetPasswordConfirmMutation, useExperienceQuery, useAddExperienceMutation,
    useLogoutMutation, useVerifyQuery
}= authApiSlice;