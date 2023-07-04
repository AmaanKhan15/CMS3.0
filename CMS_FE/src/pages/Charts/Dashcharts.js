import React from "react";
const Chart = (props) => {
    return (
        <React.Fragment>
            <div class="row g-xxl-9">
									<div class="col-xxl-8">
										<div class="card card-xxl-stretch mb-5 mb-xl-10">
                        {/*begin::Header*/}
                        <div class="card-header card-header-stretch">
                            {/*begin::Title*/}
                            <div class="card-title">
                                <h3 class="m-0 text-gray-900">Assigned Stores To Customer</h3>
                            </div>
                            {/*end::Title*/}
                            {/*begin::Toolbar*/}
                            <div class="card-toolbar">
                                <ul class="nav nav-tabs nav-line-tabs nav-stretch border-transparent fs-5 fw-bolder" id="kt_security_summary_tabs">

                                    <li class="nav-item">
                                        <a class="nav-link text-active-primary" data-kt-countup-tabs="true" data-bs-toggle="tab" id="kt_security_summary_tab_day" href="#kt_security_summary_tab_pane_day">Day</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link text-active-primary" data-kt-countup-tabs="true" data-bs-toggle="tab" id="kt_security_summary_tab_week" href="#kt_security_summary_tab_pane_week">Week</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link text-active-primary active" data-kt-countup-tabs="true" data-bs-toggle="tab" href="#kt_security_summary_tab_pane_hours">Month</a>
                                    </li>
                                </ul>
                            </div>
                            {/*end::Toolbar*/}
                        </div>
                        {/*end::Header*/}
                        {/*begin::Body*/}
                        <div class="card-body pt-7 pb-0 px-0">
                            {/*begin::Tab content*/}
                            <div class="tab-content">
                                {/*begin::Tab panel*/}
                                <div class="tab-pane fade active show" id="kt_security_summary_tab_pane_hours" role="tabpanel">
                                    {/*begin::Row*/}
                                    <div class="row p-0 mb-5 px-9">
                                        {/*begin::Col*/}
                                        <div class="col">
                                            <div class="border border-dashed border-gray-300 text-center min-w-125px rounded pt-4 pb-2 my-3">
                                                <span class="fs-4 fw-bold text-success d-block">Stores Assigned</span>
                                                <span class="fs-2hx fw-bolder text-gray-900" data-kt-countup="true" data-kt-countup-value="36899">0</span>
                                            </div>
                                        </div>
                                        {/*end::Col*/}
                                        {/*begin::Col*/}
                                        <div class="col">
                                            <div class="border border-dashed border-gray-300 text-center min-w-125px rounded pt-4 pb-2 my-3">
                                                <span class="fs-4 fw-bold text-primary d-block">Stores Sales Rate</span>
                                                <span class="fs-2hx fw-bolder text-gray-900" data-kt-countup="true" data-kt-countup-value="72">0</span>
                                            </div>
                                        </div>
                                        {/*end::Col*/}
                                        {/*begin::Col*/}
                                        <div class="col">
                                            <div class="border border-dashed border-gray-300 text-center min-w-125px rounded pt-4 pb-2 my-3">
                                                <span class="fs-4 fw-bold text-danger d-block">Failed Attempts</span>
                                                <span class="fs-2hx fw-bolder text-gray-900" data-kt-countup="true" data-kt-countup-value="291">0</span>
                                            </div>
                                        </div>
                                        {/*end::Col*/}
                                    </div>
                                    {/*end::Row*/}
                                    {/*begin::Container*/}
                                    <div class="pt-2">
                                        {/*begin::Tabs*/}
                                        <div class="d-flex align-items-center pb-6 px-9">
                                            {/*begin::Title*/}
                                            <h3 class="m-0 text-gray-900 flex-grow-1">Activity Chart</h3>
                                            {/*end::Title*/}
                                            {/*begin::Nav pills*/}
                                            <ul class="nav nav-pills nav-line-pills border rounded p-1">
                                                <li class="nav-item me-2">
                                                    <a class="nav-link btn btn-active-light btn-active-color-gray-700 btn-color-gray-400 py-2 px-5 fs-6 fw-bold active" data-bs-toggle="tab" id="kt_security_summary_tab_hours_agents" href="#kt_security_summary_tab_pane_hours_agents">Agents</a>
                                                </li>
                                                <li class="nav-item">
                                                    <a class="nav-link btn btn-active-light btn-active-color-gray-700 btn-color-gray-400 py-2 px-5 fs-6 fw-bold" data-bs-toggle="tab" id="kt_security_summary_tab_hours_clients" href="#kt_security_summary_tab_pane_hours_clients">Clients</a>
                                                </li>
                                            </ul>
                                            {/*end::Nav pills*/}
                                        </div>
                                        {/*end::Tabs*/}
                                        {/*begin::Tab content*/}
                                        <div class="tab-content px-3">
                                            {/*begin::Tab pane*/}
                                            <div class="tab-pane fade active show" id="kt_security_summary_tab_pane_hours_agents" role="tabpanel">
                                                {/*begin::Chart*/}
                                                <div id="kt_security_summary_chart_hours_agents" style={{ "height": "300px" }}></div>
                                                {/*end::Chart*/}
                                            </div>
                                            {/*end::Tab pane*/}
                                            {/*begin::Tab pane*/}
                                            <div class="tab-pane fade" id="kt_security_summary_tab_pane_hours_clients" role="tabpanel">
                                                {/*begin::Chart*/}
                                                <div id="kt_security_summary_chart_hours_clients" style={{ "height": "300px" }}></div>
                                                {/*end::Chart*/}
                                            </div>
                                            {/*end::Tab pane*/}
                                        </div>
                                        {/*end::Tab content*/}
                                    </div>
                                    {/*end::Container*/}
                                </div>
                                {/*end::Tab panel*/}
                                {/*begin::Tab panel*/}
                                <div class="tab-pane fade" id="kt_security_summary_tab_pane_day" role="tabpanel">
                                    {/*begin::Row*/}
                                    <div class="row p-0 mb-5 px-9">
                                        {/*begin::Col*/}
                                        <div class="col">
                                            <div class="border border-dashed border-gray-300 text-center min-w-125px rounded pt-4 pb-2 my-3">
                                                <span class="fs-4 fw-bold text-success d-block">Stores Assigned</span>
                                                <span class="fs-2hx fw-bolder text-gray-800" data-kt-countup="true" data-kt-countup-value="30467">0</span>
                                            </div>
                                        </div>
                                        {/*end::Col*/}
                                        {/*begin::Col*/}
                                        <div class="col">
                                            <div class="border border-dashed border-gray-300 text-center min-w-125px rounded pt-4 pb-2 my-3">
                                                <span class="fs-4 fw-bold text-primary d-block">Stores Sales Rate</span>
                                                <span class="fs-2hx fw-bolder text-gray-800" data-kt-countup="true" data-kt-countup-value="120">0</span>
                                            </div>
                                        </div>
                                        {/*end::Col*/}
                                        {/*begin::Col*/}
                                        <div class="col">
                                            <div class="border border-dashed border-gray-300 text-center min-w-125px rounded pt-4 pb-2 my-3">
                                                <span class="fs-4 fw-bold text-danger d-block">Failed Attempts</span>
                                                <span class="fs-2hx fw-bolder text-gray-800" data-kt-countup="true" data-kt-countup-value="23">0</span>
                                            </div>
                                        </div>
                                    </div>
                                    {/*end::Row*/}
                                    {/*begin::Container*/}
                                    <div class="pt-2">
                                        {/*begin::Tabs*/}
                                        <div class="d-flex align-items-center pb-9 px-9">
                                            <h3 class="m-0 text-gray-800 flex-grow-1">Activity Chart</h3>
                                            {/*begin::Nav pills*/}
                                            <ul class="nav nav-pills nav-line-pills border rounded p-1">
                                                <li class="nav-item me-2">
                                                    <a class="nav-link btn btn-active-light btn-active-color-gray-700 btn-color-gray-400 py-2 px-5 fs-6 fw-bold active" data-bs-toggle="tab" id="kt_security_summary_tab_day_agents" href="#kt_security_summary_tab_pane_day_agents">Agents</a>
                                                </li>
                                                <li class="nav-item">
                                                    <a class="nav-link btn btn-active-light btn-active-color-gray-700 btn-color-gray-400 py-2 px-5 fs-6 fw-bold" data-bs-toggle="tab" id="kt_security_summary_tab_day_clients" href="#kt_security_summary_tab_pane_day_clients">Clients</a>
                                                </li>
                                            </ul>
                                            {/*end::Nav pills*/}
                                        </div>
                                        {/*end::Tabs*/}
                                        {/*begin::Tab content*/}
                                        <div class="tab-content">
                                            <div class="tab-pane fade active show" id="kt_security_summary_tab_pane_day_agents" role="tabpanel">
                                                {/*begin::Chart*/}
                                                <div id="kt_security_summary_chart_day_agents" style={{ "height": "300px" }}></div>
                                                {/*end::Chart*/}
                                            </div>
                                            <div class="tab-pane fade" id="kt_security_summary_tab_pane_day_clients" role="tabpanel">
                                                {/*begin::Chart*/}
                                                <div id="kt_security_summary_chart_day_clients" style={{ "height": "300px" }}></div>
                                                {/*end::Chart*/}
                                            </div>
                                        </div>
                                        {/*end::Tab content*/}
                                    </div>
                                    {/*end::Container*/}
                                </div>
                                {/*end::Tab panel*/}
                                {/*begin::Tab panel*/}
                                <div class="tab-pane fade" id="kt_security_summary_tab_pane_week" role="tabpanel">
                                    {/*begin::Row*/}
                                    <div class="row p-0 mb-5 px-9">
                                        {/*begin::Col*/}
                                        <div class="col">
                                            <div class="border border-dashed border-gray-300 text-center min-w-125px rounded pt-4 pb-2 my-3">
                                                <span class="fs-lg-4 fs-6 fw-bold text-success d-block">Stores Assigned</span>
                                                <span class="fs-lg-2hx fs-2 fw-bolder text-gray-800" data-kt-countup="true" data-kt-countup-value="340">0</span>
                                            </div>
                                        </div>
                                        {/*end::Col*/}
                                        {/*begin::Col*/}
                                        <div class="col">
                                            <div class="border border-dashed border-gray-300 text-center min-w-125px rounded pt-4 pb-2 my-3">
                                                <span class="fs-lg-4 fs-6 fw-bold text-primary d-block">Stores Sales Rate</span>
                                                <span class="fs-lg-2hx fs-2 fw-bolder text-gray-800" data-kt-countup="true" data-kt-countup-value="90">0</span>
                                            </div>
                                        </div>
                                        {/*end::Col*/}
                                        {/*begin::Col*/}
                                        <div class="col">
                                            <div class="border border-dashed border-gray-300 text-center min-w-125px rounded pt-4 pb-2 my-3">
                                                <span class="fs-lg-4 fs-6 fw-bold text-danger d-block">Failed Attempts</span>
                                                <span class="fs-lg-2hx fs-2 fw-bolder text-gray-800" data-kt-countup="true" data-kt-countup-value="230">0</span>
                                            </div>
                                        </div>
                                        {/*end::Col*/}
                                    </div>
                                    {/*end::Row*/}
                                    {/*begin::Container*/}
                                    <div class="pt-2">
                                        {/*begin::Tabs*/}
                                        <div class="d-flex align-items-center pb-9 px-9">
                                            <h3 class="m-0 text-gray-800 flex-grow-1">Activity Chart</h3>
                                            {/*begin::Nav pills*/}
                                            <ul class="nav nav-pills nav-line-pills border rounded p-1">
                                                <li class="nav-item me-2">
                                                    <a class="nav-link btn btn-active-light py-2 px-5 fs-6 btn-active-color-gray-700 btn-color-gray-400 fw-bold active" data-bs-toggle="tab" id="kt_security_summary_tab_week_agents" href="#kt_security_summary_tab_pane_week_agents">Agents</a>
                                                </li>
                                                <li class="nav-item">
                                                    <a class="nav-link btn btn-active-light py-2 px-5 btn-active-color-gray-700 btn-color-gray-400 fs-6 fw-bold" data-bs-toggle="tab" id="kt_security_summary_tab_week_clients" href="#kt_security_summary_tab_pane_week_clients">Clients</a>
                                                </li>
                                            </ul>
                                            {/*end::Nav pills*/}
                                        </div>
                                        {/*end::Tabs*/}
                                        {/*begin::Tab content*/}
                                        <div class="tab-content">
                                            <div class="tab-pane fade active show" id="kt_security_summary_tab_pane_week_agents" role="tabpanel">
                                                {/*begin::Chart*/}
                                                <div id="kt_security_summary_chart_week_agents" style={{ "height": "300px" }}></div>
                                                {/*end::Chart*/}
                                            </div>
                                            <div class="tab-pane fade" id="kt_security_summary_tab_pane_week_clients" role="tabpanel">
                                                {/*begin::Chart*/}
                                                <div id="kt_security_summary_chart_week_clients" style={{ "height": "300px" }}></div>
                                                {/*end::Chart*/}
                                            </div>
                                        </div>
                                        {/*end::Tab content*/}
                                    </div>
                                    {/*end::Container*/}
                                </div>
                                {/*end::Tab panel*/}
                            </div>
                            {/*end::Tab content*/}
                        </div>
                        {/*end::Body*/}
                    </div>
                    {/*end::Security summary*/}
                </div>
                {/*end::Col*/}

            </div>
        </React.Fragment>
    )
}
export default Chart;
