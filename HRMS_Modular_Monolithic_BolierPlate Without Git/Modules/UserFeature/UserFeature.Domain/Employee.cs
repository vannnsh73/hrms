using HRMS.Core.Postgres.Common;
using HRMS.Shared.Domain.Entity;

namespace UserFeature.Domain
{
    public class Employee : BaseEntity
    {
        public string? Department { get; set; }
        public string? Designation { get; set; }
        public string? Email { get; set; }
        public string? EmploymentStatus { get; set; }  // Active, Inactive, OnLeave, Terminated
        public string? FirstName { get; set; }
        public DateTime? JoiningDate { get; set; }
        public string? LastName { get; set; }
        public string? ManagerId { get; set; }
        public string? Phone { get; set; }
        public string? Country { get; set; }            // IN, US
        public string? Role { get; set; }               // Employee, Manager, HR, Admin
        public Address? Address { get; set; }
    }
}
