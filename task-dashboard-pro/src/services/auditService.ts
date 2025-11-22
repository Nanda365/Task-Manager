import api from './api';

export interface AuditLog {
  _id: string;
  action: string;
  entityType?: string;
  entityId?: string | null;
  details?: Record<string, any>;
  timestamp: string;
  userId?: string;
}

export const auditService = {
  getAuditLogs: async (): Promise<AuditLog[]> => {
    const response = await api.get<AuditLog[]>('/audit-logs');
    return response.data;
  },
};
