  "use client";

  import Link from "next/link";
  import { useMemo, useState } from "react";
  import { Menu, X, User, ChevronRight, ChevronDown } from "lucide-react";
  import { useGetDepartmentsQuery } from "@/store/api/departmentAPi";
  import { useGetCarCompaniesQuery } from "@/store/api/carCompaniesAPi";
  import { useGetCarModelsQuery } from "@/store/api/carModelAPi";
  import { useGetSubModelsQuery } from "@/store/api/subModelsApi";

  type DepartmentType = {
    _id: string;
    name: string;
    slug: string;
    description?: string;
    image?: string;
    isActive: boolean;
  };

  type CompanyType = {
    _id: string;
    name: string;
    slug: string;
    description?: string;
    logo?: string;
    isActive: boolean;
  };

  type ModelType = {
    _id: string;
    name: string;
    slug: string;
    description?: string;
    image?: string;
    isActive: boolean;
    companyId:
      | string
      | {
          _id: string;
          name: string;
          slug: string;
        };
  };

  type SubModelType = {
    _id: string;
    name: string;
    slug: string;
    description?: string;
    image?: string;
    isActive: boolean;
    modelId:
      | string
      | {
          _id: string;
          name: string;
          slug: string;
          companyId?: {
            _id: string;
            name: string;
            slug: string;
          };
        };
  };

  const getId = (value: any) => {
    if (!value) return "";
    if (typeof value === "string") return value;
    return value?._id || "";
  };

  const buildListingUrl = ({
    departmentSlug,
    companySlug,
    modelSlug,
    subModelSlug,
  }: {
    departmentSlug?: string;
    companySlug?: string;
    modelSlug?: string;
    subModelSlug?: string;
  }) => {
    const params = new URLSearchParams();

    if (departmentSlug) params.set("department", departmentSlug);
    if (companySlug) params.set("company", companySlug);
    if (modelSlug) params.set("model", modelSlug);
    if (subModelSlug) params.set("subModel", subModelSlug);

    return `/products?${params.toString()}`;
  };

  export default function NavbarMegaMenuApple() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeDepartmentId, setActiveDepartmentId] = useState<string | null>(
      null
    );
    const [activeCompanyId, setActiveCompanyId] = useState<string | null>(null);
    const [activeModelId, setActiveModelId] = useState<string | null>(null);

    const { data: departmentsData, isLoading: departmentsLoading } =
      useGetDepartmentsQuery({
        page: 1,
        limit: 100,
        search: "",
        sortBy: "createdAt",
        sortOrder: "desc",
      });

    const { data: companiesData, isLoading: companiesLoading } =
      useGetCarCompaniesQuery({
        page: 1,
        limit: 1000,
        search: "",
      });

    const { data: modelsData, isLoading: modelsLoading } = useGetCarModelsQuery({
      page: 1,
      limit: 1000,
      search: "",
    });

    const { data: subModelsData, isLoading: subModelsLoading } =
      useGetSubModelsQuery({
        page: 1,
        limit: 1000,
        search: "",
      });

    const departments: DepartmentType[] = useMemo(
      () =>
        (departmentsData?.data?.result || []).filter(
          (item: DepartmentType) => item.isActive
        ),
      [departmentsData]
    );

    const companies: CompanyType[] = useMemo(
      () =>
        (companiesData?.data?.result || []).filter(
          (item: CompanyType) => item.isActive
        ),
      [companiesData]
    );

    const models: ModelType[] = useMemo(
      () =>
        (modelsData?.data?.result || []).filter(
          (item: ModelType) => item.isActive
        ),
      [modelsData]
    );

    const subModels: SubModelType[] = useMemo(
      () =>
        (subModelsData?.data?.result || []).filter(
          (item: SubModelType) => item.isActive
        ),
      [subModelsData]
    );

    const activeDepartment =
      departments.find((item) => item._id === activeDepartmentId) || null;

    const activeCompany =
      companies.find((item) => item._id === activeCompanyId) || null;

    const activeModel = models.find((item) => item._id === activeModelId) || null;

    const visibleCompanies = companies;

    const visibleModels = useMemo(() => {
      if (!activeCompanyId) return [];
      return models.filter((item) => getId(item.companyId) === activeCompanyId);
    }, [models, activeCompanyId]);

    const visibleSubModels = useMemo(() => {
      if (!activeModelId) return [];
      return subModels.filter((item) => getId(item.modelId) === activeModelId);
    }, [subModels, activeModelId]);

    const handleDepartmentOpen = (departmentId: string) => {
      setActiveDepartmentId(departmentId);
      setActiveCompanyId(null);
      setActiveModelId(null);
    };

    const handleCloseMegaMenu = () => {
      setActiveDepartmentId(null);
      setActiveCompanyId(null);
      setActiveModelId(null);
    };

    const isLoading =
      departmentsLoading || companiesLoading || modelsLoading || subModelsLoading;

    return (
      <header className="sticky top-0 z-50 border-b border-black/5 bg-white/80 backdrop-blur-xl dark:border-white/10 dark:bg-black/60">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 md:px-6">
          {/* Logo */}
          <div className="flex min-w-[120px] items-center">
            <Link
              href="/"
              className="text-[17px] font-semibold tracking-tight text-black dark:text-white"
            >
              Car Audio
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden flex-1 items-center justify-center lg:flex">
            <div className="flex items-center gap-1">
              {departments.map((department) => {
                const isActive = activeDepartmentId === department._id;

                return (
                  <div key={department._id} className="relative">
                    <button
                      type="button"
                      onMouseEnter={() => handleDepartmentOpen(department._id)}
                      onClick={() => handleDepartmentOpen(department._id)}
                      className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-black text-white dark:bg-white dark:text-black"
                          : "text-black/80 hover:bg-black/[0.04] dark:text-white/85 dark:hover:bg-white/10"
                      }`}
                    >
                      {department.name}
                    </button>
                  </div>
                );
              })}
            </div>
          </nav>

          {/* Right Side */}
          <div className="flex min-w-[120px] items-center justify-end gap-2">
            <Link
              href="/admin"
              className="hidden rounded-full p-2 text-black/80 transition hover:bg-black/[0.05] dark:text-white/85 dark:hover:bg-white/10 lg:inline-flex"
            >
              <User className="h-4 w-4" />
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              className="inline-flex rounded-full p-2 text-black/80 transition hover:bg-black/[0.05] dark:text-white/85 dark:hover:bg-white/10 lg:hidden"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Desktop Overlay */}
        {activeDepartmentId && (
          <>
            <div
              className="fixed h-screen inset-0 top-14 z-40 bg-black/20 backdrop-blur-[2px]"
              onClick={handleCloseMegaMenu}
            />

            <div className="absolute left-0 right-0 top-full z-50 border-t border-black/5 bg-white/90 backdrop-blur-2xl dark:border-white/10 dark:bg-[#0b0b0c]/90">
              <div className="mx-auto max-w-7xl px-6 py-10">
                <div className="grid grid-cols-12 gap-8">
                  {/* Intro */}
                  <div className="col-span-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black/40 dark:text-white/40">
                      Explore
                    </p>

                    <h2 className="mt-3 text-3xl font-semibold tracking-tight text-black dark:text-white">
                      {activeDepartment?.name}
                    </h2>

                    <p className="mt-3 max-w-xs text-sm leading-6 text-black/60 dark:text-white/60">
                      {activeDepartment?.description ||
                        "Choose a brand, then model, then sub model with a clean Apple-style browsing experience."}
                    </p>

                    <div className="mt-6">
                      <Link
                        href={buildListingUrl({
                          departmentSlug: activeDepartment?.slug,
                        })}
                        className="inline-flex items-center rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90 dark:bg-white dark:text-black"
                      >
                        View All
                      </Link>
                    </div>
                  </div>

                  {/* Companies */}
                  <div className="col-span-3">
                    <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-black/40 dark:text-white/40">
                      Companies
                    </p>

                    <div className="space-y-1.5">
                      {visibleCompanies.map((company) => {
                        const isSelected = activeCompanyId === company._id;

                        return (
                          <button
                            key={company._id}
                            type="button"
                            onMouseEnter={() => {
                              setActiveCompanyId(company._id);
                              setActiveModelId(null);
                            }}
                            onClick={() => {
                              setActiveCompanyId(company._id);
                              setActiveModelId(null);
                            }}
                            className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left transition-all duration-200 ${
                              isSelected
                                ? "bg-black text-white shadow-sm dark:bg-white dark:text-black"
                                : "text-black/80 hover:bg-black/[0.04] dark:text-white/85 dark:hover:bg-white/10"
                            }`}
                          >
                            <span className="text-sm font-medium">{company.name}</span>
                            <ChevronRight className="h-4 w-4 opacity-70" />
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Models */}
                  <div className="col-span-3">
                    <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-black/40 dark:text-white/40">
                      Models
                    </p>

                    {!activeCompanyId ? (
                      <div className="rounded-2xl border border-black/5 bg-black/[0.02] p-5 text-sm text-black/50 dark:border-white/10 dark:bg-white/[0.03] dark:text-white/45">
                        Select a company
                      </div>
                    ) : visibleModels.length > 0 ? (
                      <div className="space-y-1.5">
                        {visibleModels.map((model) => {
                          const isSelected = activeModelId === model._id;

                          return (
                            <button
                              key={model._id}
                              type="button"
                              onMouseEnter={() => setActiveModelId(model._id)}
                              onClick={() => setActiveModelId(model._id)}
                              className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left transition-all duration-200 ${
                                isSelected
                                  ? "bg-black text-white shadow-sm dark:bg-white dark:text-black"
                                  : "text-black/80 hover:bg-black/[0.04] dark:text-white/85 dark:hover:bg-white/10"
                              }`}
                            >
                              <span className="text-sm font-medium">{model.name}</span>
                              <ChevronRight className="h-4 w-4 opacity-70" />
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="rounded-2xl border border-black/5 bg-black/[0.02] p-5 text-sm text-black/50 dark:border-white/10 dark:bg-white/[0.03] dark:text-white/45">
                        No models found
                      </div>
                    )}
                  </div>

                  {/* Sub Models */}
                  <div className="col-span-3">
                    <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-black/40 dark:text-white/40">
                      Sub Models
                    </p>

                    {!activeModelId ? (
                      <div className="rounded-2xl border border-black/5 bg-black/[0.02] p-5 text-sm text-black/50 dark:border-white/10 dark:bg-white/[0.03] dark:text-white/45">
                        Select a model
                      </div>
                    ) : visibleSubModels.length > 0 ? (
                      <div className="space-y-1.5">
                        {visibleSubModels.map((subModel) => (
                          <Link
                            key={subModel._id}
                            href={buildListingUrl({
                              departmentSlug: activeDepartment?.slug,
                              companySlug: activeCompany?.slug,
                              modelSlug: activeModel?.slug,
                              subModelSlug: subModel.slug,
                            })}
                            className="flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium text-black/80 transition-all duration-200 hover:bg-black/[0.04] dark:text-white/85 dark:hover:bg-white/10"
                          >
                            <span>{subModel.name}</span>
                            <ChevronRight className="h-4 w-4 opacity-60" />
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="rounded-2xl border border-black/5 bg-black/[0.02] p-5 text-sm text-black/50 dark:border-white/10 dark:bg-white/[0.03] dark:text-white/45">
                          No sub models found
                        </div>

                        <Link
                          href={buildListingUrl({
                            departmentSlug: activeDepartment?.slug,
                            companySlug: activeCompany?.slug,
                            modelSlug: activeModel?.slug,
                          })}
                          className="inline-flex items-center rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90 dark:bg-white dark:text-black"
                        >
                          View {activeModel?.name}
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="border-t border-black/5 bg-white/95 px-4 py-4 backdrop-blur-xl dark:border-white/10 dark:bg-black/95 lg:hidden">
            <div className="space-y-3">
              <Link
                href="/admin"
                className="flex items-center gap-2 rounded-2xl bg-black/[0.03] px-4 py-3 text-sm font-medium text-black/80 dark:bg-white/[0.04] dark:text-white/85"
              >
                <User className="h-4 w-4" />
                My Account
              </Link>

              {departments.map((department) => {
                const isActive = activeDepartmentId === department._id;

                return (
                  <div
                    key={department._id}
                    className="overflow-hidden rounded-3xl border border-black/5 bg-white dark:border-white/10 dark:bg-white/[0.02]"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        if (isActive) {
                          setActiveDepartmentId(null);
                          setActiveCompanyId(null);
                          setActiveModelId(null);
                        } else {
                          setActiveDepartmentId(department._id);
                          setActiveCompanyId(null);
                          setActiveModelId(null);
                        }
                      }}
                      className="flex w-full items-center justify-between px-4 py-4 text-left"
                    >
                      <span className="text-sm font-semibold text-black dark:text-white">
                        {department.name}
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 transition ${
                          isActive ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {isActive && (
                      <div className="border-t border-black/5 px-4 pb-4 pt-3 dark:border-white/10">
                        <Link
                          href={buildListingUrl({
                            departmentSlug: department.slug,
                          })}
                          className="mb-4 inline-flex items-center rounded-full bg-black px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-black"
                        >
                          View All {department.name}
                        </Link>

                        <div className="space-y-3">
                          <div>
                            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-black/40 dark:text-white/40">
                              Companies
                            </p>
                            <div className="space-y-2">
                              {visibleCompanies.map((company) => (
                                <button
                                  key={company._id}
                                  type="button"
                                  onClick={() => {
                                    setActiveCompanyId(company._id);
                                    setActiveModelId(null);
                                  }}
                                  className={`flex w-full items-center justify-between rounded-2xl px-3 py-3 text-left ${
                                    activeCompanyId === company._id
                                      ? "bg-black text-white dark:bg-white dark:text-black"
                                      : "bg-black/[0.03] text-black/80 dark:bg-white/[0.04] dark:text-white/85"
                                  }`}
                                >
                                  <span className="text-sm font-medium">
                                    {company.name}
                                  </span>
                                  <ChevronRight className="h-4 w-4" />
                                </button>
                              ))}
                            </div>
                          </div>

                          {activeCompanyId && (
                            <div>
                              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-black/40 dark:text-white/40">
                                Models
                              </p>
                              <div className="space-y-2">
                                {visibleModels.map((model) => (
                                  <button
                                    key={model._id}
                                    type="button"
                                    onClick={() => setActiveModelId(model._id)}
                                    className={`flex w-full items-center justify-between rounded-2xl px-3 py-3 text-left ${
                                      activeModelId === model._id
                                        ? "bg-black text-white dark:bg-white dark:text-black"
                                        : "bg-black/[0.03] text-black/80 dark:bg-white/[0.04] dark:text-white/85"
                                    }`}
                                  >
                                    <span className="text-sm font-medium">
                                      {model.name}
                                    </span>
                                    <ChevronRight className="h-4 w-4" />
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}

                          {activeModelId && (
                            <div>
                              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-black/40 dark:text-white/40">
                                Sub Models
                              </p>

                              {visibleSubModels.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                  {visibleSubModels.map((sub) => (
                                    <Link
                                      key={sub._id}
                                      href={buildListingUrl({
                                        departmentSlug: department.slug,
                                        companySlug: activeCompany?.slug,
                                        modelSlug: activeModel?.slug,
                                        subModelSlug: sub.slug,
                                      })}
                                      className="rounded-full bg-black/[0.05] px-3 py-2 text-xs font-medium text-black/80 dark:bg-white/[0.06] dark:text-white/85"
                                    >
                                      {sub.name}
                                    </Link>
                                  ))}
                                </div>
                              ) : (
                                <Link
                                  href={buildListingUrl({
                                    departmentSlug: department.slug,
                                    companySlug: activeCompany?.slug,
                                    modelSlug: activeModel?.slug,
                                  })}
                                  className="inline-flex items-center rounded-full bg-black px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-black"
                                >
                                  View {activeModel?.name}
                                </Link>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {isLoading && (
                <div className="rounded-2xl bg-black/[0.03] p-4 text-sm text-black/50 dark:bg-white/[0.04] dark:text-white/45">
                  Loading menu...
                </div>
              )}
            </div>
          </div>
        )}
      </header>
    );
  }