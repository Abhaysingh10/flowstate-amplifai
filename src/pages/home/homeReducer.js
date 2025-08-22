import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  // Companies data
  companies: [],
  filteredCompanies: [],
  
  // Loading states
  loading: false,
  exportLoading: false,
  addLoading: false,
  updateLoading: false,
  deleteLoading: false,
  
  // Error states
  error: null,
  exportError: null,
  addError: null,
  updateError: null,
  deleteError: null,
  
  // Pagination
  currentPage: 1,
  pageSize: 10,
  totalPages: 1,
  totalCount: 0,
  
  // Search and filters
  searchQuery: '',
  
  // Success messages
  successMessage: null,
};

// Create slice
export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    // Fetch companies
    fetchCompaniesRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCompaniesSuccess: (state, action) => {
      state.loading = false;
      const data = action.payload.data || action.payload;
      state.companies = data;
      state.filteredCompanies = data;
      state.totalCount = action.payload.total || data.length;
      state.totalPages = Math.ceil((action.payload.total || data.length) / state.pageSize);
      state.error = null;
    },
    fetchCompaniesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Search companies
    searchCompanies: (state, action) => {
      const query = action.payload.toLowerCase();
      const filtered = state.companies.filter(company =>
        company.name.toLowerCase().includes(query) ||
        company.ceo.toLowerCase().includes(query)
      );
      
      state.searchQuery = action.payload;
      state.filteredCompanies = filtered;
      state.currentPage = 1;
      state.totalCount = filtered.length;
      state.totalPages = Math.ceil(filtered.length / state.pageSize);
    },

    // Set page
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },

    // Export companies
    exportCompaniesRequest: (state) => {
      state.exportLoading = true;
      state.exportError = null;
    },
    exportCompaniesSuccess: (state) => {
      state.exportLoading = false;
      state.exportError = null;
    },
    exportCompaniesFailure: (state, action) => {
      state.exportLoading = false;
      state.exportError = action.payload;
    },

    // Add company
    addCompanyRequest: (state) => {
      state.addLoading = true;
      state.addError = null;
      state.successMessage = null;
    },
    addCompanySuccess: (state) => {
      state.addLoading = false;
      state.addError = null;
      state.successMessage = 'Company added successfully!';
    },
    addCompanyFailure: (state, action) => {
      state.addLoading = false;
      state.addError = action.payload;
      state.successMessage = null;
    },

    // Update company
    updateCompanyRequest: (state) => {
      state.updateLoading = true;
      state.updateError = null;
      state.successMessage = null;
    },
    updateCompanySuccess: (state) => {
      state.updateLoading = false;
      state.updateError = null;
      state.successMessage = 'Company updated successfully!';
    },
    updateCompanyFailure: (state, action) => {
      state.updateLoading = false;
      state.updateError = action.payload;
      state.successMessage = null;
    },

    // Delete company
    deleteCompanyRequest: (state) => {
      state.deleteLoading = true;
      state.deleteError = null;
      state.successMessage = null;
    },
    deleteCompanySuccess: (state) => {
      state.deleteLoading = false;
      state.deleteError = null;
      state.successMessage = 'Company deleted successfully!';
    },
    deleteCompanyFailure: (state, action) => {
      state.deleteLoading = false;
      state.deleteError = action.payload;
      state.successMessage = null;
    },

    // Clear success message
    clearSuccessMessage: (state) => {
      state.successMessage = null;
    },

    // Clear errors
    clearErrors: (state) => {
      state.error = null;
      state.exportError = null;
      state.addError = null;
      state.updateError = null;
      state.deleteError = null;
    },
  },
});

// Export actions
export const {
  fetchCompaniesRequest,
  fetchCompaniesSuccess,
  fetchCompaniesFailure,
  searchCompanies,
  setPage,
  exportCompaniesRequest,
  exportCompaniesSuccess,
  exportCompaniesFailure,
  addCompanyRequest,
  addCompanySuccess,
  addCompanyFailure,
  updateCompanyRequest,
  updateCompanySuccess,
  updateCompanyFailure,
  deleteCompanyRequest,
  deleteCompanySuccess,
  deleteCompanyFailure,
  clearSuccessMessage,
  clearErrors,
} = homeSlice.actions;

// Export reducer
export const homeReducer = homeSlice.reducer;

// Selectors
export const homeSelectors = {
  getCompanies: (state) => state.home.companies,
  getFilteredCompanies: (state) => state.home.filteredCompanies,
  getPaginatedCompanies: (state) => {
    const { filteredCompanies, currentPage, pageSize } = state.home;
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredCompanies.slice(startIndex, endIndex);
  },
  isLoading: (state) => state.home.loading,
  isExportLoading: (state) => state.home.exportLoading,
  isAddLoading: (state) => state.home.addLoading,
  isUpdateLoading: (state) => state.home.updateLoading,
  isDeleteLoading: (state) => state.home.deleteLoading,
  getError: (state) => state.home.error,
  getExportError: (state) => state.home.exportError,
  getAddError: (state) => state.home.addError,
  getUpdateError: (state) => state.home.updateError,
  getDeleteError: (state) => state.home.deleteError,
  getPagination: (state) => ({
    currentPage: state.home.currentPage,
    pageSize: state.home.pageSize,
    totalPages: state.home.totalPages,
    totalCount: state.home.totalCount,
  }),
  getSearchQuery: (state) => state.home.searchQuery,
  getSuccessMessage: (state) => state.home.successMessage,
};
