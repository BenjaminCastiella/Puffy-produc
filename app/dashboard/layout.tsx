"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  BookOpen,
  Home,
  LogOut,
  MessageSquare,
  FileText,
  Users,
  PlusCircle,
  TestTube,
} from "lucide-react";
import { ThemeProvider } from "@/components/theme-provider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [userRole, setUserRole] = useState<"student" | "teacher" | null>(null);

  useEffect(() => {
    // Check if we're in the student or teacher section
    if (pathname.includes("/dashboard/student")) {
      setUserRole("student");
    } else if (pathname.includes("/dashboard/teacher")) {
      setUserRole("teacher");
    }
  }, [pathname]);

  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <SidebarProvider>
        <div className="flex min-h-screen">
          <Sidebar className="border-r border-puffy-brown/10">
            <SidebarHeader className="pb-0">
              <Link href="/" className="flex items-center gap-2 px-4 py-3">
                <img
                  src="/images/puffy.png"
                  alt="Puffy Logo"
                  className="h-8 w-8"
                />
                <span className="text-xl font-bold text-puffy-brown">
                  Puffle
                </span>
              </Link>
            </SidebarHeader>
            <SidebarContent>
              {userRole === "student" && (
                <>
                  <SidebarGroup>
                    <SidebarGroupLabel>Navegación</SidebarGroupLabel>
                    <SidebarGroupContent>
                      <SidebarMenu>
                        <SidebarMenuItem>
                          <SidebarMenuButton
                            asChild
                            isActive={pathname === "/dashboard/student"}
                          >
                            <Link href="/dashboard/student">
                              <Home className="h-4 w-4" />
                              <span>Inicio</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                          <SidebarMenuButton
                            asChild
                            isActive={pathname === "/dashboard/student/chat"}
                          >
                            <Link href="/dashboard/student/chat">
                              <MessageSquare className="h-4 w-4" />
                              <span>Chat con Puffy</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                          <SidebarMenuButton
                            asChild
                            isActive={
                              pathname === "/dashboard/student/materials"
                            }
                          >
                            <Link href="/dashboard/student/materials">
                              <FileText className="h-4 w-4" />
                              <span>Materiales</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </SidebarGroup>
                  <SidebarGroup>
                    <SidebarGroupLabel>Mis Cursos</SidebarGroupLabel>
                    <SidebarGroupContent>
                      <SidebarMenu>
                        <SidebarMenuItem>
                          <SidebarMenuButton>
                            <BookOpen className="h-4 w-4" />
                            <span>Programación</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                          <SidebarMenuButton>
                            <BookOpen className="h-4 w-4" />
                            <span>Matemáticas</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                          <SidebarMenuButton>
                            <BookOpen className="h-4 w-4" />
                            <span>Historia</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </SidebarGroup>
                </>
              )}

              {userRole === "teacher" && (
                <>
                  <SidebarGroup>
                    <SidebarGroupLabel>Navegación</SidebarGroupLabel>
                    <SidebarGroupContent>
                      <SidebarMenu>
                        <SidebarMenuItem>
                          <SidebarMenuButton
                            asChild
                            isActive={pathname === "/dashboard/teacher"}
                          >
                            <Link href="/dashboard/teacher">
                              <Home className="h-4 w-4" />
                              <span>Inicio</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                          <SidebarMenuButton
                            asChild
                            isActive={
                              pathname === "/dashboard/teacher/materials"
                            }
                          >
                            <Link href="/dashboard/teacher/materials">
                              <PlusCircle className="h-4 w-4" />
                              <span>Agregar Material</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                          <SidebarMenuButton
                            asChild
                            isActive={pathname === "/dashboard/teacher/test"}
                          >
                            <Link href="/dashboard/teacher/test">
                              <TestTube className="h-4 w-4" />
                              <span>Testear Puffy</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                          <SidebarMenuButton
                            asChild
                            isActive={pathname === "/dashboard/teacher/reports"}
                          >
                            <Link href="/dashboard/teacher/reports">
                              <FileText className="h-4 w-4" />
                              <span>Reportes</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                          <SidebarMenuButton
                            asChild
                            isActive={
                              pathname === "/dashboard/teacher/students"
                            }
                          >
                            <Link href="/dashboard/teacher/students">
                              <Users className="h-4 w-4" />
                              <span>Estudiantes</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </SidebarGroup>
                  <SidebarGroup>
                    <SidebarGroupLabel>Mi Puffy</SidebarGroupLabel>
                    <SidebarGroupContent>
                      <SidebarMenu>
                        <SidebarMenuItem>
                          <SidebarMenuButton>
                            <BookOpen className="h-4 w-4" />
                            <span>Programación</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </SidebarGroup>
                </>
              )}
            </SidebarContent>
            <SidebarFooter className="border-t border-puffy-brown/10 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-puffy-pink text-puffy-brown">
                      {userRole === "student" ? "ES" : "DO"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-puffy-brown">
                      {userRole === "student" ? "Estudiante" : "Docente"}
                    </p>
                    <p className="text-xs text-puffy-brown-dark">
                      {userRole === "student" ? "Alumno Activo" : "Profesor"}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" asChild>
                  <Link href="/">
                    <LogOut className="h-4 w-4 text-puffy-brown" />
                    <span className="sr-only">Cerrar sesión</span>
                  </Link>
                </Button>
              </div>
            </SidebarFooter>
          </Sidebar>
          <div className="flex-1 overflow-auto">{children}</div>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
}
