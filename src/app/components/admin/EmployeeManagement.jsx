import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { 
  Users, 
  Search, 
  Mail, 
  Building2,
  Calendar,
  Trash2,
  Eye,
  Filter,
  Award,
  Activity
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { getEmployees, deleteEmployee, getEmployeeById } from '../../../services/adminService';
import { toast } from 'sonner';

export const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [filterDept, setFilterDept] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      setLoading(true);
      const emps = await getEmployees();
      setEmployees(emps);
    } catch (error) {
      console.error('Failed to load employees:', error);
      toast.error('Failed to load employees');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEmployee = async (employeeId) => {
    if (confirm('Are you sure you want to delete this employee? This action cannot be undone.')) {
      try {
        await deleteEmployee(employeeId);
        toast.success('Employee deleted successfully');
        loadEmployees();
        setSelectedEmployee(null);
      } catch (error) {
        console.error('Failed to delete employee:', error);
        toast.error('Failed to delete employee');
      }
    }
  };

  const viewEmployeeDetails = async (employee) => {
    try {
      const details = await getEmployeeById(employee.id);
      console.log('Employee details:', details); // Debug log
      setSelectedEmployee(details);
    } catch (error) {
      console.error('Failed to load employee details:', error);
      toast.error('Failed to load employee details');
    }
  };

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = filterDept === 'All' || emp.department === filterDept;
    return matchesSearch && matchesDept;
  });

  const departments = ['All', ...new Set(employees.map(e => e.department))];

  if (loading) {
    return <div className="text-center py-8">Loading employees...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Employee Management 👥</h2>
        <p className="text-gray-600 dark:text-gray-400">
          View and manage employee accounts
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Employees</p>
                <p className="text-3xl font-bold">{employees.length}</p>
              </div>
              <Users className="w-12 h-12 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Departments</p>
                <p className="text-3xl font-bold">{departments.length - 1}</p>
              </div>
              <Building2 className="w-12 h-12 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Active Today</p>
                <p className="text-3xl font-bold">
                  {employees.filter(e => {
                    const today = new Date().toISOString().split('T')[0];
                    return e.lastCheckIn === today;
                  }).length}
                </p>
              </div>
              <Activity className="w-12 h-12 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search employees by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={filterDept}
                onChange={(e) => setFilterDept(e.target.value)}
                className="px-4 py-2 border rounded-lg bg-white dark:bg-gray-950"
              >
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Employee List */}
      <Card>
        <CardHeader>
          <CardTitle>All Employees ({filteredEmployees.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Name</th>
                  <th className="text-left py-3 px-4">Email</th>
                  <th className="text-left py-3 px-4">Department</th>
                  <th className="text-left py-3 px-4">Streak</th>
                  <th className="text-left py-3 px-4">Joined</th>
                  <th className="text-right py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((employee) => {
                  return (
                    <tr key={employee.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-900">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white text-sm">
                            {employee.name.charAt(0)}
                          </div>
                          <span className="font-medium">{employee.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <Mail className="w-4 h-4" />
                          {employee.email}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="outline">{employee.department}</Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          <Award className="w-4 h-4 text-yellow-500" />
                          <span className="font-medium">{employee.streak || 0}</span>
                          <span className="text-sm text-gray-500">🔥</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                        {new Date(employee.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-end gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => viewEmployeeDetails(employee)}
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Employee Details</DialogTitle>
                              </DialogHeader>
                              {selectedEmployee && selectedEmployee.employee && selectedEmployee.employee.id === employee.id && (
                                <div className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <p className="text-sm text-gray-600 dark:text-gray-400">Name</p>
                                      <p className="font-medium">{selectedEmployee.employee.name}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                                      <p className="font-medium">{selectedEmployee.employee.email}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-gray-600 dark:text-gray-400">Department</p>
                                      <p className="font-medium">{selectedEmployee.employee.department}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-gray-600 dark:text-gray-400">Streak</p>
                                      <p className="font-medium">{selectedEmployee.employee.streak || 0} days 🔥</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-gray-600 dark:text-gray-400">Total Check-ins</p>
                                      <p className="font-medium">{selectedEmployee.totalCheckIns || 0} records</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-gray-600 dark:text-gray-400">Last Active</p>
                                      <p className="font-medium">
                                        {selectedEmployee.employee.lastCheckIn 
                                          ? new Date(selectedEmployee.employee.lastCheckIn).toLocaleDateString()
                                          : 'Never'}
                                      </p>
                                    </div>
                                  </div>

                                  <div>
                                    <h4 className="font-medium mb-2">
                                      Recent Mood Check-ins 
                                      <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                                        (Showing last {Math.min(selectedEmployee.checkIns?.length || 0, 10)} of {selectedEmployee.totalCheckIns || 0})
                                      </span>
                                    </h4>
                                    {selectedEmployee.checkIns && selectedEmployee.checkIns.length > 0 ? (
                                      <div className="max-h-96 overflow-y-auto space-y-2">
                                        {selectedEmployee.checkIns.slice(0, 10).map((checkIn, idx) => (
                                          <div key={idx} className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
                                            <div className="flex justify-between items-start mb-2">
                                              <span className="text-sm font-medium">
                                                📅 {new Date(checkIn.date).toLocaleDateString('en-US', { 
                                                  weekday: 'long', 
                                                  year: 'numeric', 
                                                  month: 'long', 
                                                  day: 'numeric' 
                                                })}
                                              </span>
                                              <span className="text-xs text-gray-500">
                                                {new Date(checkIn.createdAt).toLocaleTimeString('en-US', { 
                                                  hour: '2-digit', 
                                                  minute: '2-digit' 
                                                })}
                                              </span>
                                            </div>
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                                              <div className="flex items-center gap-1">
                                                <span className="text-gray-600 dark:text-gray-400">😊 Happiness:</span>
                                                <span className="font-medium text-green-600 dark:text-green-400">{checkIn.happiness}/5</span>
                                              </div>
                                              <div className="flex items-center gap-1">
                                                <span className="text-gray-600 dark:text-gray-400">😰 Stress:</span>
                                                <span className="font-medium text-red-600 dark:text-red-400">{checkIn.stress}/5</span>
                                              </div>
                                              <div className="flex items-center gap-1">
                                                <span className="text-gray-600 dark:text-gray-400">🚀 Motivation:</span>
                                                <span className="font-medium text-purple-600 dark:text-purple-400">{checkIn.motivation}/5</span>
                                              </div>
                                              <div className="flex items-center gap-1">
                                                <span className="text-gray-600 dark:text-gray-400">💧 Hydration:</span>
                                                <span className="font-medium text-blue-600 dark:text-blue-400">{checkIn.hydration}/5</span>
                                              </div>
                                            </div>
                                            {checkIn.notes && (
                                              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 p-2 bg-white dark:bg-gray-950 rounded italic">
                                                💭 &quot;{checkIn.notes}&quot;
                                              </p>
                                            )}
                                          </div>
                                        ))}
                                      </div>
                                    ) : (
                                      <div className="text-center py-8 text-gray-500">
                                        <Activity className="w-12 h-12 mx-auto mb-2 opacity-50" />
                                        <p>No mood check-ins recorded yet</p>
                                      </div>
                                    )}
                                  </div>

                                  <Button
                                    variant="destructive"
                                    onClick={() => handleDeleteEmployee(employee.id)}
                                    className="w-full"
                                  >
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Delete Employee
                                  </Button>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};