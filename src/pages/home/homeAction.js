import { api } from '../../services/apiClient';
import { mockCompanies } from './mockCompanies';
import {
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
} from './homeReducer';

// Action Creators
export const homeActions = {
  // Fetch companies - Simulating API call with mock data
  fetchCompanies: (params = {}) => async (dispatch) => {
    try {
      dispatch(fetchCompaniesRequest());
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate API response with mock data
      const response = {
        data: mockCompanies,
        total: mockCompanies.length,
        success: true
      };
      
      dispatch(fetchCompaniesSuccess(response));
    } catch (error) {
      dispatch(fetchCompaniesFailure(error.response?.data?.message || 'Failed to fetch companies'));
    }
  },

  // Search companies
  searchCompanies: (query) => (dispatch) => {
    dispatch(searchCompanies(query));
  },

  // Set page
  setPage: (page) => (dispatch) => {
    dispatch(setPage(page));
  },

  // Export companies
  exportCompanies: (filters = {}) => async (dispatch) => {
    try {
      dispatch(exportCompaniesRequest());
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate export with mock data
      const headers = ['Company Name', 'CEO/Key Person', 'Revenue', 'Profit', 'EBITDA', 'Gross Margin', 'Key Insights'];
      const csvContent = [
        headers.join(','),
        ...mockCompanies.map(company => [
          `"${company.name}"`,
          `"${company.ceo}"`,
          company.revenue,
          company.profit,
          company.ebitda,
          company.margin,
          `"${company.insights.join('; ')}"`
        ].join(','))
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `companies-export-${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
      dispatch(exportCompaniesSuccess());
    } catch (error) {
      dispatch(exportCompaniesFailure(error.response?.data?.message || 'Failed to export companies'));
    }
  },

  // Add company
  addCompany: (companyData) => async (dispatch) => {
    try {
      dispatch(addCompanyRequest());
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Simulate successful addition
      dispatch(addCompanySuccess());
      
      // Refresh companies list
      dispatch(homeActions.fetchCompanies());
    } catch (error) {
      dispatch(addCompanyFailure(error.response?.data?.message || 'Failed to add company'));
    }
  },

  // Update company
  updateCompany: (id, companyData) => async (dispatch) => {
    try {
      dispatch(updateCompanyRequest());
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Simulate successful update
      dispatch(updateCompanySuccess());
      
      // Refresh companies list
      dispatch(homeActions.fetchCompanies());
    } catch (error) {
      dispatch(updateCompanyFailure(error.response?.data?.message || 'Failed to update company'));
    }
  },

  // Delete company
  deleteCompany: (id) => async (dispatch) => {
    try {
      dispatch(deleteCompanyRequest());
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Simulate successful deletion
      dispatch(deleteCompanySuccess());
      
      // Refresh companies list
      dispatch(homeActions.fetchCompanies());
    } catch (error) {
      dispatch(deleteCompanyFailure(error.response?.data?.message || 'Failed to delete company'));
    }
  },

  // Clear success message
  clearSuccessMessage: () => (dispatch) => {
    dispatch(clearSuccessMessage());
  },
};

export const homeSelectors={} 
