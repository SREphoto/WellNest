// Sources/DashboardView.swift
import SwiftUI

struct DashboardView: View {
    @StateObject private var circleManager = CircleManager.shared
    
    var body: some View {
        NavigationView {
            List(circleManager.users) { user in
                HStack {
                    // Placeholder for Moodie icon
                    Text(user.mood)
                        .frame(width: 30, height: 30)
                        .background(user.score > 50 ? Color.blue : Color.red)
                        .clipShape(Circle())
                    
                    VStack(alignment: .leading) {
                        Text(user.name)
                            .font(.headline)
                        if let status = user.status {
                            Text(status)
                                .font(.subheadline)
                                .foregroundColor(.gray)
                        }
                    }
                    
                    Spacer()
                    
                    Button("Reach Out") {
                        // Placeholder for communication
                        print("Reaching out to \(user.name)")
                    }
                    .buttonStyle(.bordered)
                    .foregroundColor(.blue)
                }
                .padding(.vertical, 5)
                .background(user.score < 20 || user.status == "Help" ? Color.red.opacity(0.1) : Color.clear)
                .cornerRadius(10)
            }
            .navigationTitle("My Circle")
        }
    }
}

// Preview provider (for when you get to Xcode)
struct DashboardView_Previews: PreviewProvider {
    static var previews: some View {
        DashboardView()
    }
}
