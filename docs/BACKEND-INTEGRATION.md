# Backend Integration Guide - Dashboard Module

**Version:** 1.0.0
**Last Updated:** 2025-10-01
**Status:** 🔴 Stub Data (Hardcoded) → 🟢 Backend Integration Required

---

## 📋 Overview

This document outlines the complete backend integration requirements for the Pazz Portal Dashboard. All current data is **hardcoded using STUB_ constants** in `src/pages/Dashboard.tsx`. This guide provides the roadmap for connecting to a real backend API.

### Current Implementation Status

- ✅ UI Components: Fully implemented
- ✅ Type Definitions: Complete (`src/types/dashboard.ts`)
- ✅ Modal Interactions: Working with stub data
- 🔴 API Integration: **Not implemented** (using hardcoded data)
- 🔴 Real-time Updates: Not implemented
- 🔴 Error Handling: Basic client-side only

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     Dashboard Component                      │
│                  (src/pages/Dashboard.tsx)                   │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ├─── React Query Hooks (to be created)
                       │    └─── src/core/hooks/useDashboard.ts
                       │
                       ├─── API Service Layer (to be created)
                       │    └─── src/core/api/dashboard.ts
                       │
                       ├─── HTTP Client (existing)
                       │    └─── Axios/Fetch with auth interceptor
                       │
                       └─── Backend API
                            └─── REST API (to be implemented)
```

---

## 🔌 API Endpoints Specification

### 1. User Profile & Level System

#### `GET /api/v1/user/profile`

**Purpose:** Get current user's profile including level and sales data

**Authentication:** Required (Bearer token)

**Request:**
```http
GET /api/v1/user/profile
Authorization: Bearer {token}
```

**Response:**
```typescript
{
  "success": true,
  "data": {
    "userId": "usr_abc123",
    "currentLevel": "starter" | "master" | "legend",
    "accumulatedSales": 4020000,
    "levelProgress": {
      "currentSales": 4020000,
      "nextLevelRequired": 4500000,
      "percentageComplete": 89.3
    },
    "commissionRate": 2.0
  }
}
```

**Error Responses:**
- `401 Unauthorized`: Invalid or expired token
- `403 Forbidden`: User doesn't have access
- `500 Internal Server Error`: Server error

**Caching Strategy:**
- Cache for 5 minutes (staleTime: 5 * 60 * 1000)
- Invalidate on commission updates

---

### 2. Goals Management

#### `GET /api/v1/goals/current`

**Purpose:** Get current month's goal and progress

**Request:**
```http
GET /api/v1/goals/current
Authorization: Bearer {token}
```

**Response:**
```typescript
{
  "success": true,
  "data": {
    "id": "goal_xyz789",
    "amount": 25000,
    "currentAmount": 20000,
    "month": "Octubre",
    "year": 2025,
    "achieved": false,
    "progress": 80.0,
    "remaining": 5000,
    "earnedCommissions": 20000
  }
}
```

**Business Logic:**
- Goals are monthly (reset on 1st of each month)
- `currentAmount` updates automatically based on earned commissions
- `achieved` flag set to true when `currentAmount >= amount`

---

#### `GET /api/v1/goals/history`

**Purpose:** Get past goals with achievement status

**Request:**
```http
GET /api/v1/goals/history?limit=12&offset=0
Authorization: Bearer {token}
```

**Query Parameters:**
- `limit` (optional): Number of records (default: 12, max: 24)
- `offset` (optional): Pagination offset (default: 0)

**Response:**
```typescript
{
  "success": true,
  "data": {
    "goals": [
      {
        "id": "goal_456",
        "amount": 25000,
        "currentAmount": 26500,
        "month": "Mayo",
        "year": 2025,
        "achieved": true,
        "progress": 106.0,
        "exceededBy": 1500
      }
    ],
    "pagination": {
      "total": 8,
      "limit": 12,
      "offset": 0,
      "hasMore": false
    }
  }
}
```

**Caching Strategy:**
- Cache for 1 hour (historical data rarely changes)
- Invalidate when new goal is created

---

#### `POST /api/v1/goals`

**Purpose:** Create or update monthly goal

**Request:**
```http
POST /api/v1/goals
Authorization: Bearer {token}
Content-Type: application/json

{
  "amount": 30000,
  "month": "Noviembre",
  "year": 2025
}
```

**Response:**
```typescript
{
  "success": true,
  "data": {
    "id": "goal_new123",
    "amount": 30000,
    "currentAmount": 0,
    "month": "Noviembre",
    "year": 2025,
    "achieved": false,
    "createdAt": "2025-10-01T10:30:00Z"
  }
}
```

**Validation Rules:**
- `amount`: Required, positive number, min: 1000, max: 1000000
- `month`: Required, valid month name (Spanish)
- `year`: Required, current or future year
- Only one goal per month allowed (upsert behavior)

**Error Responses:**
- `400 Bad Request`: Invalid input (with field-level errors)
- `409 Conflict`: Goal already exists for this month

**Optimistic Update Strategy:**
- Update UI immediately before API call
- Rollback on error with toast notification

---

### 3. Promotions System

#### `GET /api/v1/promotions/active`

**Purpose:** Get currently active promotions

**Request:**
```http
GET /api/v1/promotions/active
Authorization: Bearer {token}
```

**Response:**
```typescript
{
  "success": true,
  "data": {
    "promotions": [
      {
        "id": "promo_bmw001",
        "title": "BMW Serie 4",
        "subtitle": "Gran Coupé 2025",
        "imageUrl": "https://cdn.pazz.com/promotions/bmw-serie4.jpg",
        "bonusAmount": 100000,
        "originalPrice": 1245000,
        "finalPrice": 1145000,
        "validFrom": "2025-08-01T00:00:00Z",
        "validTo": "2025-08-31T23:59:59Z",
        "isActive": true,
        "monthlyPayments": [
          { "months": 48, "amount": 45000 },
          { "months": 36, "amount": 47120 },
          { "months": 24, "amount": 49785 }
        ],
        "termsAndConditions": "https://pazz.com/terms/promo_bmw001"
      }
    ],
    "metadata": {
      "totalActive": 1,
      "nextPromotion": null
    }
  }
}
```

**Business Logic:**
- Promotions are system-wide (visible to all partners)
- Only active promotions returned (current date within validFrom/validTo)
- Sorted by priority/validFrom date
- Image URLs should be CDN-optimized

**Caching Strategy:**
- Cache for 1 hour (promotions don't change frequently)
- Background refresh every 15 minutes
- Invalidate manually from admin panel

---

### 4. Client Tracking System

#### `GET /api/v1/clients/attention-required`

**Purpose:** Get clients needing follow-up action

**Request:**
```http
GET /api/v1/clients/attention-required?limit=20&status=all
Authorization: Bearer {token}
```

**Query Parameters:**
- `limit` (optional): Max results (default: 20, max: 50)
- `status` (optional): Filter by status: `prequalification`, `documentation`, `approval`, `all` (default: all)

**Response:**
```typescript
{
  "success": true,
  "data": {
    "clients": [
      {
        "id": "client_abc123",
        "name": "Pedro Juan Gutiérrez González",
        "status": "prequalification",
        "statusLabel": "Precalificación sin concluir",
        "lastAccessed": "2025-08-14T15:30:00Z",
        "startedAt": "2025-08-12T10:00:00Z",
        "phone": "5215598772310",
        "email": "pedro.gutierrez@example.com",
        "message": "Hola Pedro, vi que iniciaste tu precalificación pero no la has completado...",
        "daysInactive": 3,
        "progressPercentage": 45,
        "nextAction": "complete_prequalification",
        "priority": "high" | "medium" | "low"
      }
    ],
    "metadata": {
      "total": 3,
      "byStatus": {
        "prequalification": 2,
        "documentation": 1,
        "approval": 0,
        "financing": 0
      }
    }
  }
}
```

**Business Logic:**
- Only returns clients assigned to the authenticated partner
- Sorted by priority, then by lastAccessed (oldest first)
- "Attention required" logic:
  - Prequalification incomplete > 48 hours
  - Documentation incomplete > 72 hours
  - No activity in last 7 days
- Messages are pre-generated based on status and inactivity

**Caching Strategy:**
- Cache for 2 minutes (data changes frequently)
- Polling every 5 minutes for updates
- Real-time updates via WebSocket (optional)

**Priority Calculation:**
- `high`: Inactive > 7 days OR high value deal (>500k)
- `medium`: Inactive 3-7 days
- `low`: Inactive < 3 days

---

#### `GET /api/v1/clients/:clientId`

**Purpose:** Get detailed client information

**Request:**
```http
GET /api/v1/clients/client_abc123
Authorization: Bearer {token}
```

**Response:**
```typescript
{
  "success": true,
  "data": {
    "id": "client_abc123",
    "name": "Pedro Juan Gutiérrez González",
    "email": "pedro.gutierrez@example.com",
    "phone": "5215598772310",
    "status": "prequalification",
    "statusLabel": "Precalificación sin concluir",
    "startedAt": "2025-08-12T10:00:00Z",
    "lastAccessed": "2025-08-14T15:30:00Z",
    "progressPercentage": 45,
    "timeline": [
      {
        "event": "prequalification_started",
        "timestamp": "2025-08-12T10:00:00Z",
        "description": "Inició precalificación"
      },
      {
        "event": "document_uploaded",
        "timestamp": "2025-08-12T10:15:00Z",
        "description": "Subió INE"
      }
    ],
    "vehicleInterest": {
      "make": "BMW",
      "model": "Serie 4",
      "year": 2025,
      "estimatedValue": 1245000
    },
    "assignedPartner": {
      "id": "usr_partner123",
      "name": "Current User"
    }
  }
}
```

---

### 5. Commissions & Earnings

#### `GET /api/v1/commissions/summary`

**Purpose:** Get commission summary for current month

**Request:**
```http
GET /api/v1/commissions/summary?month=10&year=2025
Authorization: Bearer {token}
```

**Query Parameters:**
- `month` (optional): Month number (1-12, default: current month)
- `year` (optional): Year (default: current year)

**Response:**
```typescript
{
  "success": true,
  "data": {
    "period": {
      "month": "Octubre",
      "year": 2025,
      "monthNumber": 10
    },
    "earned": {
      "amount": 20000,
      "currency": "MXN",
      "deals": 5
    },
    "pending": {
      "amount": 15000,
      "currency": "MXN",
      "deals": 3
    },
    "breakdown": [
      {
        "dealId": "deal_001",
        "clientName": "Juan Pérez",
        "vehicleMake": "BMW",
        "vehicleModel": "Serie 4",
        "commissionAmount": 5000,
        "commissionRate": 2.0,
        "status": "paid",
        "paidAt": "2025-10-05T10:00:00Z"
      }
    ]
  }
}
```

**Caching Strategy:**
- Cache for 5 minutes
- Invalidate on new deal completion

---

## 📦 Data Models (TypeScript Interfaces)

### API Response Wrapper

```typescript
// src/types/api.ts

export interface ApiResponse<T> {
  success: boolean
  data: T
  error?: {
    code: string
    message: string
    details?: Record<string, string[]>
  }
  metadata?: {
    timestamp: string
    requestId: string
  }
}

export interface PaginatedResponse<T> {
  items: T[]
  pagination: {
    total: number
    limit: number
    offset: number
    hasMore: boolean
  }
}
```

### Dashboard-Specific Types

```typescript
// src/types/dashboard-api.ts

export interface UserProfileResponse {
  userId: string
  currentLevel: LevelType
  accumulatedSales: number
  levelProgress: {
    currentSales: number
    nextLevelRequired: number
    percentageComplete: number
  }
  commissionRate: number
}

export interface GoalResponse {
  id: string
  amount: number
  currentAmount: number
  month: string
  year: number
  achieved: boolean
  progress: number
  remaining: number
  earnedCommissions?: number
}

export interface CreateGoalRequest {
  amount: number
  month: string
  year: number
}

export interface PromotionResponse {
  id: string
  title: string
  subtitle: string
  imageUrl: string
  bonusAmount: number
  originalPrice: number
  finalPrice: number
  validFrom: string
  validTo: string
  isActive: boolean
  monthlyPayments: Array<{
    months: number
    amount: number
  }>
  termsAndConditions?: string
}

export interface ClientAttentionResponse {
  id: string
  name: string
  status: ClientStatus
  statusLabel: string
  lastAccessed: string
  startedAt: string
  phone?: string
  email?: string
  message?: string
  daysInactive: number
  progressPercentage: number
  nextAction: string
  priority: 'high' | 'medium' | 'low'
}
```

---

## 🔨 Implementation Guide

### Step 1: Create API Service Layer

```typescript
// src/core/api/dashboard.ts

import type {
  UserProfileResponse,
  GoalResponse,
  CreateGoalRequest,
  PromotionResponse,
  ClientAttentionResponse,
} from '@/types/dashboard-api'
import type { ApiResponse, PaginatedResponse } from '@/types/api'
import { apiClient } from './client' // Axios instance with auth

export const dashboardApi = {
  // User Profile & Level
  getUserProfile: async (): Promise<UserProfileResponse> => {
    const response = await apiClient.get<ApiResponse<UserProfileResponse>>(
      '/api/v1/user/profile'
    )
    return response.data.data
  },

  // Goals
  getCurrentGoal: async (): Promise<GoalResponse> => {
    const response = await apiClient.get<ApiResponse<GoalResponse>>(
      '/api/v1/goals/current'
    )
    return response.data.data
  },

  getGoalHistory: async (limit = 12): Promise<GoalResponse[]> => {
    const response = await apiClient.get<
      ApiResponse<PaginatedResponse<GoalResponse>>
    >('/api/v1/goals/history', { params: { limit } })
    return response.data.data.items
  },

  createGoal: async (goal: CreateGoalRequest): Promise<GoalResponse> => {
    const response = await apiClient.post<ApiResponse<GoalResponse>>(
      '/api/v1/goals',
      goal
    )
    return response.data.data
  },

  // Promotions
  getActivePromotions: async (): Promise<PromotionResponse[]> => {
    const response = await apiClient.get<
      ApiResponse<{ promotions: PromotionResponse[] }>
    >('/api/v1/promotions/active')
    return response.data.data.promotions
  },

  // Clients
  getClientsNeedingAttention: async (): Promise<ClientAttentionResponse[]> => {
    const response = await apiClient.get<
      ApiResponse<{ clients: ClientAttentionResponse[] }>
    >('/api/v1/clients/attention-required')
    return response.data.data.clients
  },
}
```

---

### Step 2: Create React Query Hooks

```typescript
// src/core/hooks/useDashboard.ts

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { dashboardApi } from '@/core/api/dashboard'
import type { CreateGoalRequest } from '@/types/dashboard-api'
import { toast } from 'sonner'

// Query Keys
export const DASHBOARD_KEYS = {
  profile: ['dashboard', 'profile'] as const,
  currentGoal: ['dashboard', 'goals', 'current'] as const,
  goalHistory: ['dashboard', 'goals', 'history'] as const,
  promotions: ['dashboard', 'promotions'] as const,
  clientsAttention: ['dashboard', 'clients', 'attention'] as const,
}

// User Profile Hook
export const useUserProfile = () => {
  return useQuery({
    queryKey: DASHBOARD_KEYS.profile,
    queryFn: dashboardApi.getUserProfile,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  })
}

// Current Goal Hook
export const useCurrentGoal = () => {
  return useQuery({
    queryKey: DASHBOARD_KEYS.currentGoal,
    queryFn: dashboardApi.getCurrentGoal,
    staleTime: 2 * 60 * 1000, // 2 minutes
    retry: 2,
  })
}

// Goal History Hook
export const useGoalHistory = () => {
  return useQuery({
    queryKey: DASHBOARD_KEYS.goalHistory,
    queryFn: () => dashboardApi.getGoalHistory(),
    staleTime: 60 * 60 * 1000, // 1 hour (historical data)
    retry: 1,
  })
}

// Create Goal Mutation
export const useCreateGoal = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (goal: CreateGoalRequest) => dashboardApi.createGoal(goal),
    onSuccess: (data) => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: DASHBOARD_KEYS.currentGoal })
      queryClient.invalidateQueries({ queryKey: DASHBOARD_KEYS.goalHistory })
      toast.success('Meta guardada exitosamente')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error?.message || 'Error al guardar la meta')
    },
  })
}

// Active Promotions Hook
export const useActivePromotions = () => {
  return useQuery({
    queryKey: DASHBOARD_KEYS.promotions,
    queryFn: dashboardApi.getActivePromotions,
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 2 * 60 * 60 * 1000, // 2 hours
    retry: 2,
  })
}

// Clients Needing Attention Hook
export const useClientsNeedingAttention = () => {
  return useQuery({
    queryKey: DASHBOARD_KEYS.clientsAttention,
    queryFn: dashboardApi.getClientsNeedingAttention,
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchInterval: 5 * 60 * 1000, // Poll every 5 minutes
    retry: 2,
  })
}
```

---

### Step 3: Update Dashboard Component

```typescript
// src/pages/Dashboard.tsx - UPDATED VERSION

import React, { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { LevelBadge } from '@/components/dashboard/LevelBadge'
import { GoalProgressCard } from '@/components/dashboard/GoalProgressCard'
import { PromotionCard } from '@/components/dashboard/PromotionCard'
import { ClientAttentionItem } from '@/components/dashboard/ClientAttentionItem'
import { GoalModal } from '@/components/dashboard/GoalModal'
import { PromotionModal } from '@/components/dashboard/PromotionModal'
import { ClientDetailModal } from '@/components/dashboard/ClientDetailModal'
import { LevelModal } from '@/components/dashboard/LevelModal'
import { Spinner } from '@/ui/spinner'
import type { Promotion, Client } from '@/types/dashboard'

// Import React Query hooks
import {
  useUserProfile,
  useCurrentGoal,
  useGoalHistory,
  useActivePromotions,
  useClientsNeedingAttention,
  useCreateGoal,
} from '@/core/hooks/useDashboard'

interface DashboardOutletContext {
  setHeaderRightElement?: (element: React.ReactNode) => void
}

export default function Dashboard() {
  const { setHeaderRightElement } = useOutletContext<DashboardOutletContext>()

  // React Query hooks
  const { data: profile, isLoading: profileLoading } = useUserProfile()
  const { data: currentGoal, isLoading: goalLoading } = useCurrentGoal()
  const { data: goalHistory } = useGoalHistory()
  const { data: promotions, isLoading: promotionsLoading } = useActivePromotions()
  const { data: clients, isLoading: clientsLoading } = useClientsNeedingAttention()
  const createGoalMutation = useCreateGoal()

  // Modal states
  const [goalModalOpen, setGoalModalOpen] = useState(false)
  const [promotionModalOpen, setPromotionModalOpen] = useState(false)
  const [clientModalOpen, setClientModalOpen] = useState(false)
  const [levelModalOpen, setLevelModalOpen] = useState(false)
  const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(null)
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)

  // Set level badge in header
  React.useEffect(() => {
    if (profile) {
      setHeaderRightElement?.(
        <LevelBadge
          level={profile.currentLevel}
          onClick={() => setLevelModalOpen(true)}
        />
      )
    }
    return () => setHeaderRightElement?.(null)
  }, [profile, setHeaderRightElement])

  // Handle save goal
  const handleSaveGoal = (amount: number) => {
    createGoalMutation.mutate({
      amount,
      month: new Date().toLocaleString('es-MX', { month: 'long' }),
      year: new Date().getFullYear(),
    })
  }

  // Loading state
  if (profileLoading || goalLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spinner size="lg" />
      </div>
    )
  }

  // Error state (profile and goal are required)
  if (!profile || !currentGoal) {
    return (
      <div className="text-center text-slate-600 py-12">
        No se pudo cargar la información. Por favor, intenta de nuevo.
      </div>
    )
  }

  return (
    <div className="space-y-6 pb-6 pt-4">
      <GoalProgressCard
        goal={currentGoal}
        earnedCommissions={currentGoal.earnedCommissions || 0}
        onGoalClick={() => setGoalModalOpen(true)}
      />

      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Promociones vigentes</h2>
        {promotionsLoading ? (
          <div className="flex gap-4">
            <div className="w-[280px] h-[300px] bg-slate-100 rounded-lg animate-pulse" />
          </div>
        ) : promotions && promotions.length > 0 ? (
          <div className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
            {promotions.map((promotion) => (
              <PromotionCard
                key={promotion.id}
                promotion={promotion}
                onClick={() => {
                  setSelectedPromotion(promotion)
                  setPromotionModalOpen(true)
                }}
              />
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-600">No hay promociones activas</p>
        )}
      </div>

      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Clientes que requieren atención</h2>
        {clientsLoading ? (
          <div className="space-y-2">
            <div className="h-20 bg-slate-100 rounded-lg animate-pulse" />
            <div className="h-20 bg-slate-100 rounded-lg animate-pulse" />
          </div>
        ) : clients && clients.length > 0 ? (
          <div className="space-y-2">
            {clients.map((client) => (
              <ClientAttentionItem
                key={client.id}
                client={client}
                onClick={() => {
                  setSelectedClient(client)
                  setClientModalOpen(true)
                }}
              />
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-600">
            No hay clientes que requieran atención
          </p>
        )}
      </div>

      {/* Modals */}
      <GoalModal
        open={goalModalOpen}
        onOpenChange={setGoalModalOpen}
        currentGoal={currentGoal}
        pastGoals={goalHistory || []}
        onSaveGoal={handleSaveGoal}
      />

      <PromotionModal
        open={promotionModalOpen}
        onOpenChange={setPromotionModalOpen}
        promotion={selectedPromotion}
      />

      <ClientDetailModal
        open={clientModalOpen}
        onOpenChange={setClientModalOpen}
        client={selectedClient}
      />

      <LevelModal
        open={levelModalOpen}
        onOpenChange={setLevelModalOpen}
        currentLevel={profile.currentLevel}
        accumulatedSales={profile.accumulatedSales}
      />
    </div>
  )
}
```

---

## 🔐 Authentication & Authorization

### Bearer Token Strategy

All API requests must include authentication token:

```typescript
// src/core/api/client.ts

import axios from 'axios'
import { getAuthToken, refreshAuthToken } from '@/core/auth'

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor: Add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = getAuthToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor: Handle token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // Token expired - attempt refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const newToken = await refreshAuthToken()
        originalRequest.headers.Authorization = `Bearer ${newToken}`
        return apiClient(originalRequest)
      } catch (refreshError) {
        // Refresh failed - redirect to login
        window.location.href = '/auth/login'
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)
```

### Role-Based Access Control

```typescript
// Backend should validate partner access to client data
// Each endpoint should check:
// - User is authenticated
// - User has 'partner' role
// - User can only access their assigned clients
// - User can only see promotions for their region/level
```

---

## 🚨 Error Handling Patterns

### Standardized Error Response

```typescript
// All backend errors should follow this format
{
  "success": false,
  "error": {
    "code": "GOAL_VALIDATION_FAILED",
    "message": "La meta debe ser mayor a $1,000",
    "details": {
      "amount": ["Debe ser mayor a 1000"]
    }
  },
  "metadata": {
    "timestamp": "2025-10-01T10:30:00Z",
    "requestId": "req_abc123"
  }
}
```

### Frontend Error Handling

```typescript
// src/core/utils/error-handler.ts

import { toast } from 'sonner'

export const handleApiError = (error: any, defaultMessage: string) => {
  if (error.response?.data?.error) {
    const apiError = error.response.data.error

    // Show field-level errors
    if (apiError.details) {
      Object.entries(apiError.details).forEach(([field, messages]) => {
        toast.error(`${field}: ${(messages as string[]).join(', ')}`)
      })
    } else {
      toast.error(apiError.message || defaultMessage)
    }
  } else if (error.message === 'Network Error') {
    toast.error('Error de conexión. Verifica tu internet.')
  } else {
    toast.error(defaultMessage)
  }
}
```

---

## ⚡ Performance Optimization

### 1. Parallel Data Fetching

```typescript
// Use React Query's parallel query feature
export const useDashboardData = () => {
  const profile = useUserProfile()
  const goal = useCurrentGoal()
  const promotions = useActivePromotions()
  const clients = useClientsNeedingAttention()

  return {
    isLoading: profile.isLoading || goal.isLoading,
    isError: profile.isError || goal.isError,
    data: {
      profile: profile.data,
      goal: goal.data,
      promotions: promotions.data,
      clients: clients.data,
    },
  }
}
```

### 2. Optimistic Updates

```typescript
export const useCreateGoal = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: dashboardApi.createGoal,
    // Optimistic update
    onMutate: async (newGoal) => {
      await queryClient.cancelQueries({ queryKey: DASHBOARD_KEYS.currentGoal })

      const previousGoal = queryClient.getQueryData(DASHBOARD_KEYS.currentGoal)

      // Optimistically update
      queryClient.setQueryData(DASHBOARD_KEYS.currentGoal, newGoal)

      return { previousGoal }
    },
    // Rollback on error
    onError: (err, newGoal, context) => {
      queryClient.setQueryData(
        DASHBOARD_KEYS.currentGoal,
        context?.previousGoal
      )
    },
    // Refetch on success
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: DASHBOARD_KEYS.currentGoal })
    },
  })
}
```

### 3. Image Optimization

```typescript
// Use CDN with query parameters for optimization
const getOptimizedImageUrl = (url: string, width: number) => {
  return `${url}?w=${width}&q=80&fm=webp`
}

// In PromotionCard component
<img
  src={getOptimizedImageUrl(promotion.imageUrl, 800)}
  srcSet={`
    ${getOptimizedImageUrl(promotion.imageUrl, 400)} 400w,
    ${getOptimizedImageUrl(promotion.imageUrl, 800)} 800w
  `}
  sizes="(max-width: 640px) 280px, 400px"
  alt={promotion.title}
  loading="lazy"
/>
```

---

## 📡 Real-time Updates (Optional Enhancement)

### WebSocket Integration

```typescript
// src/core/api/websocket.ts

import { io, Socket } from 'socket.io-client'
import { useQueryClient } from '@tanstack/react-query'
import { DASHBOARD_KEYS } from '@/core/hooks/useDashboard'

let socket: Socket | null = null

export const initWebSocket = (token: string) => {
  socket = io(import.meta.env.VITE_WS_URL, {
    auth: { token },
    transports: ['websocket'],
  })

  return socket
}

export const useDashboardWebSocket = () => {
  const queryClient = useQueryClient()

  React.useEffect(() => {
    if (!socket) return

    // Listen for goal updates
    socket.on('goal:updated', (data) => {
      queryClient.setQueryData(DASHBOARD_KEYS.currentGoal, data)
    })

    // Listen for new client requiring attention
    socket.on('client:attention', (data) => {
      queryClient.invalidateQueries({ queryKey: DASHBOARD_KEYS.clientsAttention })
      toast.info(`Nuevo cliente requiere atención: ${data.clientName}`)
    })

    // Listen for commission updates
    socket.on('commission:earned', (data) => {
      queryClient.invalidateQueries({ queryKey: DASHBOARD_KEYS.currentGoal })
      toast.success(`¡Nueva comisión de ${formatCurrency(data.amount)}!`)
    })

    return () => {
      socket?.off('goal:updated')
      socket?.off('client:attention')
      socket?.off('commission:earned')
    }
  }, [queryClient])
}
```

**Backend Events to Emit:**
- `goal:updated` - When goal progress changes
- `client:attention` - New client needs attention
- `commission:earned` - New commission recorded
- `promotion:new` - New promotion activated
- `level:upgraded` - User level changed

---

## 🧪 Testing Strategies

### 1. Mock API Responses

```typescript
// src/mocks/handlers.ts (MSW)

import { rest } from 'msw'

export const dashboardHandlers = [
  rest.get('/api/v1/user/profile', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        data: {
          userId: 'usr_test123',
          currentLevel: 'starter',
          accumulatedSales: 4020000,
          levelProgress: {
            currentSales: 4020000,
            nextLevelRequired: 4500000,
            percentageComplete: 89.3,
          },
          commissionRate: 2.0,
        },
      })
    )
  }),

  rest.get('/api/v1/goals/current', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        data: {
          id: 'goal_test',
          amount: 25000,
          currentAmount: 20000,
          month: 'Octubre',
          year: 2025,
          achieved: false,
          progress: 80.0,
          remaining: 5000,
          earnedCommissions: 20000,
        },
      })
    )
  }),
]
```

### 2. Integration Tests

```typescript
// src/pages/Dashboard.test.tsx

import { render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Dashboard from './Dashboard'
import { server } from '@/mocks/server'

describe('Dashboard', () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )

  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  it('loads and displays user profile data', async () => {
    render(<Dashboard />, { wrapper })

    await waitFor(() => {
      expect(screen.getByText('Starter')).toBeInTheDocument()
    })
  })

  it('displays current goal progress', async () => {
    render(<Dashboard />, { wrapper })

    await waitFor(() => {
      expect(screen.getByText('$25,000')).toBeInTheDocument()
      expect(screen.getByText('$20,000')).toBeInTheDocument()
    })
  })
})
```

---

## 🔄 Migration Path

### Phase 1: Setup (Week 1)
1. ✅ Create API service layer (`src/core/api/dashboard.ts`)
2. ✅ Create React Query hooks (`src/core/hooks/useDashboard.ts`)
3. ✅ Add MSW for development/testing
4. ✅ Update environment variables

### Phase 2: Integration (Week 2)
1. ✅ Update Dashboard.tsx to use hooks
2. ✅ Replace STUB_ constants with API calls
3. ✅ Add loading/error states
4. ✅ Implement error handling

### Phase 3: Optimization (Week 3)
1. ✅ Add optimistic updates
2. ✅ Implement caching strategies
3. ✅ Add polling for client updates
4. ✅ Optimize image loading

### Phase 4: Enhancement (Week 4)
1. ⚪ Add WebSocket for real-time updates
2. ⚪ Implement offline support (service worker)
3. ⚪ Add analytics tracking
4. ⚪ Performance monitoring

---

## 📚 Additional Resources

### Environment Variables

```env
# .env.local
VITE_API_BASE_URL=https://api.pazz.com
VITE_WS_URL=wss://ws.pazz.com
VITE_CDN_URL=https://cdn.pazz.com
```

### Backend API Documentation

Once backend is implemented, full API documentation should be available at:
- OpenAPI/Swagger: `https://api.pazz.com/docs`
- Postman Collection: Link to be provided

### Security Considerations

1. **Token Storage**: Store in httpOnly cookies (not localStorage)
2. **CORS**: Configure proper CORS headers on backend
3. **Rate Limiting**: Implement on backend (100 req/min per user)
4. **Input Validation**: Both client and server-side
5. **SQL Injection**: Use parameterized queries on backend
6. **XSS Prevention**: Sanitize all user inputs

---

## 📞 Support & Contacts

**Backend Team Lead:** [To be assigned]
**API Documentation:** [To be provided]
**Slack Channel:** #pazz-backend-integration

---

**Document Status:** ✅ Complete - Ready for Backend Implementation
**Next Review:** 2025-11-01
**Owner:** Frontend Team
