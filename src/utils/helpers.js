export const setRoutes = config => {
  let routes = [...config.routes]

  if (config.settings || config.auth) {
    routes = routes.map(route => {
      let auth = config.auth ? [...config.auth] : null
      auth = route.auth ? [...auth, ...route.auth] : auth
      return {
        ...route,
        settings: { ...config.settings, ...route.settings },
        auth
      }
    })
  }

  return [...routes]
}
export const generateRoutesFromConfigs = configs => {
  let allRoutes = []
  configs.forEach(config => {
    allRoutes = [...allRoutes, ...setRoutes(config)]
  })
  return allRoutes
}

export const hasPermission = (authArr, userRole) => {
  /**
   * If auth array is not defined
   * Pass and allow
   */
  if (authArr === null || authArr === undefined) {
    // console.info("auth is null || undefined:", authArr);
    return true
  } else if (authArr.length === 0) {
    /**
     * if auth array is empty means,
     * allow only user role is guest (null or empty[])
     */
    // console.info("auth is empty[]:", authArr);
    return !userRole || userRole.length === 0
  } else {
    /**
     * Check if user has grants
     */
    // console.info("auth arr:", authArr);
    /*
          Check if user role is array,
          */
    if (userRole && Array.isArray(userRole)) {
      return authArr.some(r => userRole.indexOf(r) >= 0)
    }

    /*
          Check if user role is string,
          */
    return authArr.includes(userRole)
  }
}
export const stringTruncator = (string, length) => {
  return string.slice(0, length) + "..."
}
