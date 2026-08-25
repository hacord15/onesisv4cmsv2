import type { Access, FieldAccess } from 'payload'

/** Anyone (including the public frontend) can read. */
export const anyone: Access = () => true

/** Only logged-in Payload users (the admin panel) can write. */
export const authenticated: Access = ({ req: { user } }) => Boolean(user)

export const authenticatedField: FieldAccess = ({ req: { user } }) => Boolean(user)
