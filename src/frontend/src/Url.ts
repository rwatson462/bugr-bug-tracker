
const Url = {
    root: '/',
    auth: {
        login: '/login',
        logout: '/logout',
        profile: '/user/profile',
        register: '/register',
    },
    api: {
        login: '/login',
        logout: '/logout',
        register: '/register',
        validateToken: '/user/validate',
        changePassword: '/user/password',
        dashboard: '/dashboard',
        projects: {
            all: '/projects',
            create: '/projects/create',
            get: (id: number) => `/project/${id}`,
            delete: (id: number) => `/project/${id}`,
            bugs: (id: number) => `/project/${id}/bugs`
        }
    },
    bugs: {
        byProject: (projectId: number) => `/bugs/${projectId}`,
        view: (id: number) => `/bug/${id}`
    },
    projects: {
        all: '/projects',
        view: (id: number) => `/project/${id}`,  // this is a function to use to generate a url
        one: '/project/:projectId'         // this is the url that the above function generates to we can navigate to it
    }
}

export default Url